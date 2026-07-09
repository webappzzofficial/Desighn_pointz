import { createClient } from "@supabase/supabase-js";
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceRoot = path.resolve(process.argv[2] ?? path.join(root, "Products"));
const outputRoot = path.join(root, "public", "assets", "imported-products");
const outputFile = path.join(root, "src", "data", "importedProducts.ts");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const categoryMap = new Map([
  ["gift items", { id: "gift-items", name: "Gift Items", slug: "gift-items" }],
  ["id cards", { id: "id-cards", name: "ID Cards", slug: "id-cards" }],
  ["mementos & trophies", { id: "mementos-trophies", name: "Mementos & Trophies", slug: "mementos-trophies" }],
  ["mementos and trophies", { id: "mementos-trophies", name: "Mementos & Trophies", slug: "mementos-trophies" }],
  ["wedding cards", { id: "wedding-cards", name: "Wedding Cards", slug: "wedding-cards" }]
]);

const knownCategories = [...new Map([...categoryMap.values()].map((category) => [category.slug, category])).values()];

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function stripImageExtensions(fileName) {
  let value = fileName;
  while (supportedExtensions.has(path.extname(value).toLowerCase())) {
    value = value.slice(0, -path.extname(value).length);
  }
  return value;
}

function titleCase(value) {
  return value
    .toLowerCase()
    .replace(/\b[a-z0-9]/g, (character) => character.toUpperCase())
    .replace(/\bId\b/g, "ID")
    .replace(/\bPvc\b/g, "PVC")
    .replace(/\bPx\b/g, "PX")
    .replace(/\bDpm\b/g, "DPM")
    .replace(/\bDpw\b/g, "DPW")
    .replace(/\bA4\b/g, "A4");
}

function productNameFromFile(fileName) {
  const withoutExtensions = stripImageExtensions(fileName)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const galleryBase = withoutExtensions
    .replace(/\s*\(\d+\)\s*$/g, "")
    .replace(/\s+(?:image|img|photo|pic)\s*\d+$/i, "")
    .replace(/[\s-]+\d+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return titleCase(galleryBase || withoutExtensions);
}

function safeFileName(fileName, index) {
  const ext = path.extname(fileName).toLowerCase() || ".jpg";
  return `${String(index + 1).padStart(2, "0")}-${slugify(stripImageExtensions(fileName))}${ext}`;
}

async function listCategoryFiles(categoryPath) {
  const entries = await readdir(categoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(categoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listCategoryFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

async function readExistingImports() {
  try {
    const text = await readFile(outputFile, "utf8");
    const match = text.match(/export const importedProducts: Product\[] = (\[[\s\S]*\]);?\s*$/);
    return match ? JSON.parse(match[1]) : [];
  } catch {
    return [];
  }
}

async function scanProducts() {
  const categoryFolders = await readdir(sourceRoot, { withFileTypes: true });
  const existing = new Map((await readExistingImports()).map((product) => [product.slug, product]));
  const importedProducts = [];
  const warnings = [];

  await rm(outputRoot, { recursive: true, force: true });

  for (const folder of categoryFolders) {
    if (!folder.isDirectory()) continue;

    const category = categoryMap.get(folder.name.trim().toLowerCase());
    if (!category) {
      warnings.push(`Skipped unknown category folder: ${folder.name}`);
      continue;
    }

    const categoryPath = path.join(sourceRoot, folder.name);
    const files = await listCategoryFiles(categoryPath);
    const rawGrouped = new Map();

    for (const filePath of files) {
      const productName = productNameFromFile(path.basename(filePath));
      const rawSlug = slugify(productName);
      const group = rawGrouped.get(rawSlug) ?? {
        category,
        productName,
        productSlug: rawSlug,
        files: []
      };
      group.files.push(filePath);
      rawGrouped.set(rawSlug, group);
    }

    const grouped = new Map(rawGrouped);
    for (const [slug, group] of rawGrouped.entries()) {
      if (!slug.endsWith("s")) continue;

      const singularSlug = slug.slice(0, -1);
      const singularGroup = grouped.get(singularSlug);
      if (!singularGroup) continue;

      singularGroup.files.push(...group.files);
      grouped.delete(slug);
    }

    for (const group of grouped.values()) {
      const productId = `imported-${group.category.id}-${group.productSlug}`;
      const productAssetDir = path.join(outputRoot, group.category.slug, group.productSlug);
      await mkdir(productAssetDir, { recursive: true });

      const images = [];
      for (const [index, filePath] of group.files.slice(0, 5).entries()) {
        const destinationName = safeFileName(path.basename(filePath), index);
        const destination = path.join(productAssetDir, destinationName);
        await copyFile(filePath, destination);
        images.push({
          id: `${productId}-${index + 1}`,
          productId,
          imageUrl: `/assets/imported-products/${group.category.slug}/${group.productSlug}/${destinationName}`,
          isPrimary: index === 0,
          sortOrder: index + 1
        });
      }

      if (group.files.length > 5) {
        warnings.push(`Imported first 5 images for ${group.productName}; skipped ${group.files.length - 5} extra file(s).`);
      }

      const existingProduct = existing.get(group.productSlug);
      importedProducts.push({
        id: existingProduct?.id ?? productId,
        categoryId: existingProduct?.categoryId ?? group.category.id,
        name: existingProduct?.name ?? group.productName,
        slug: existingProduct?.slug ?? group.productSlug,
        description: existingProduct?.description ?? "",
        shortDescription: existingProduct?.shortDescription ?? "",
        price: existingProduct?.price ?? null,
        isActive: existingProduct?.isActive ?? true,
        isFeatured: existingProduct?.isFeatured ?? false,
        createdAt: existingProduct?.createdAt ?? new Date().toISOString().slice(0, 10),
        images: mergeImages(existingProduct?.images ?? [], images)
      });
    }
  }

  importedProducts.sort((a, b) => a.categoryId.localeCompare(b.categoryId) || a.name.localeCompare(b.name));
  return { importedProducts, warnings };
}

function mergeImages(existingImages, importedImages) {
  const byUrl = new Map();
  for (const image of [...existingImages, ...importedImages]) {
    byUrl.set(image.imageUrl, image);
  }

  return [...byUrl.values()]
    .slice(0, 5)
    .map((image, index) => ({
      ...image,
      isPrimary: index === 0,
      sortOrder: index + 1
    }));
}

async function writeCatalog(products) {
  const body = `import type { Product } from "../types/catalog";

export const importedProducts: Product[] = ${JSON.stringify(products, null, 2)};
`;
  await writeFile(outputFile, body, "utf8");
}

async function upsertSupabase(products) {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { skipped: true, message: "Supabase upload skipped. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable database/storage import." };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  for (const [index, category] of knownCategories.entries()) {
    const { error } = await supabase
      .from("categories")
      .upsert(
        {
          name: category.name,
          slug: category.slug,
          image_url: `/assets/categories/${category.slug === "mementos-trophies" ? "mementos-trophy" : category.slug}.jpg`,
          is_active: true,
          sort_order: index + 1
        },
        { onConflict: "slug" }
      );

    if (error) throw error;
  }

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, slug");

  if (categoriesError) throw categoriesError;

  const categoryIds = new Map((categories ?? []).map((category) => [category.slug, category.id]));
  const publicUrlByLocalUrl = new Map();

  for (const product of products) {
    for (const image of product.images) {
      const localPath = path.join(root, "public", image.imageUrl.replace(/^\//, ""));
      const fileBytes = await readFile(localPath);
      const storagePath = image.imageUrl.replace(/^\/assets\/imported-products\//, "");
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(storagePath, fileBytes, {
          cacheControl: "31536000",
          upsert: true,
          contentType: contentTypeFromPath(localPath)
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("products").getPublicUrl(storagePath);
      publicUrlByLocalUrl.set(image.imageUrl, data.publicUrl);
    }
  }

  let productCount = 0;
  let imageCount = 0;

  for (const product of products) {
    const categoryId = categoryIds.get(product.categoryId);
    if (!categoryId) throw new Error(`Missing Supabase category for slug: ${product.categoryId}`);

    const { data: existingProduct, error: existingProductError } = await supabase
      .from("products")
      .select("id")
      .eq("slug", product.slug)
      .maybeSingle();

    if (existingProductError) throw existingProductError;

    let productId = existingProduct?.id;

    if (!productId) {
      const { data: insertedProduct, error: productError } = await supabase
        .from("products")
        .insert({
          category_id: categoryId,
          name: product.name,
          slug: product.slug,
          description: product.description ?? "",
          price: product.price,
          is_active: product.isActive
        })
        .select("id")
        .single();

      if (productError) throw productError;
      productId = insertedProduct.id;
    }

    const { error: productCategoryError } = await supabase
      .from("products")
      .update({ category_id: categoryId })
      .eq("id", productId);

    if (productCategoryError) throw productCategoryError;
    productCount += 1;

    for (const image of product.images) {
      const imageUrl = publicUrlByLocalUrl.get(image.imageUrl) ?? image.imageUrl;
      const { error: imageError } = await supabase
        .from("product_images")
        .upsert(
          {
            product_id: productId,
            image_url: imageUrl,
            is_primary: image.isPrimary,
            sort_order: image.sortOrder
          },
          { onConflict: "product_id,image_url" }
        );

      if (imageError) throw imageError;
      imageCount += 1;
    }
  }

  return { skipped: false, productCount, imageCount };
}

function contentTypeFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".avif") return "image/avif";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

const { importedProducts, warnings } = await scanProducts();
await writeCatalog(importedProducts);
const supabaseResult = await upsertSupabase(importedProducts);

console.log(`Imported ${importedProducts.length} product(s) from ${sourceRoot}`);
console.log(`Generated ${path.relative(root, outputFile)}`);
if (supabaseResult.skipped) {
  console.log(supabaseResult.message);
} else {
  console.log(`Supabase upsert complete: ${supabaseResult.productCount} product(s), ${supabaseResult.imageCount} image(s).`);
}
for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}
