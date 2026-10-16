const backendUrl = (process.env.API_BASE_URL ?? "http://localhost:8080").replace(
  /\/+$/,
  "",
);
const importLimit = Number(process.env.IMPORT_LIMIT ?? 60);

interface DemoProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductRecord {
  name: string;
}

function normalizedName(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function importProducts(): Promise<void> {
  const [existingResponse, sourceResponse] = await Promise.all([
    fetch(`${backendUrl}/api/products`),
    fetch(`https://dummyjson.com/products?limit=${importLimit}`),
  ]);

  if (!existingResponse.ok) {
    throw new Error(`Backend ürünleri okunamadı: HTTP ${existingResponse.status}`);
  }
  if (!sourceResponse.ok) {
    throw new Error(`Demo ürünleri alınamadı: HTTP ${sourceResponse.status}`);
  }

  const existing = (await existingResponse.json()) as ProductRecord[];
  const source = (await sourceResponse.json()) as { products: DemoProduct[] };
  const existingNames = new Set(existing.map((product) => normalizedName(product.name)));
  let imported = 0;
  let skipped = 0;

  for (const product of source.products) {
    const key = normalizedName(product.title);
    if (existingNames.has(key)) {
      skipped += 1;
      continue;
    }

    const response = await fetch(`${backendUrl}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `Ürün eklenemedi (${product.title}): HTTP ${response.status} ${message}`,
      );
    }

    existingNames.add(key);
    imported += 1;
  }

  console.log(`Demo kataloğu hazır: ${imported} yeni ürün eklendi, ${skipped} ürün zaten vardı.`);
}

importProducts().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Ürün aktarımı başarısız oldu.",
  );
  process.exitCode = 1;
});
