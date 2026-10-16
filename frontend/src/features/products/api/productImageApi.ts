interface ImageCatalogItem {
  title: string;
  thumbnail: string;
  images: string[];
}

interface ImageCatalogResponse {
  products: ImageCatalogItem[];
}

export async function getProductImages(): Promise<Map<string, string>> {
  const response = await fetch("https://dummyjson.com/products?limit=200");
  if (!response.ok) {
    throw new Error("Ürün görselleri yüklenemedi.");
  }

  const data = (await response.json()) as ImageCatalogResponse;
  return new Map(
    data.products.map((item) => [
      normalizeName(item.title),
      item.images[0] || item.thumbnail,
    ]),
  );
}

export function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .trim();
}
