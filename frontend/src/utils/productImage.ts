const categoryImages: Record<string, string> = {
  beauty:
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
  fragrances:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
  furniture:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  groceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
  laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
  smartphones:
    "https://images.unsplash.com/photo-1511706198871-1f1f3f5d7a0c?auto=format&fit=crop&w=900&q=85",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85";

const namedProductImages: Record<string, string> = {
  "kablosuz kulaklık":
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  "minimalist sırt çantası":
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
  "seramik kupa":
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
};

const productNames: Record<string, string> = {
  "essence mascara lash princess": "Essence Maskara Lash Princess",
  "eyeshadow palette with mirror": "Aynalı Far Paleti",
  "powder canister": "Pudra",
  "red lipstick": "Kırmızı Ruj",
  "red nail polish": "Kırmızı Oje",
  "calvin klein ck one": "Calvin Klein CK One Parfüm",
  "chanel coco noir eau de": "Chanel Coco Noir Parfüm",
  "dior j'adore": "Dior J'adore Parfüm",
  "dolce shine eau de": "Dolce Shine Parfüm",
  "gucci bloom eau de": "Gucci Bloom Parfüm",
};

const productDescriptions: Record<string, string> = {
  "essence mascara lash princess":
    "Kirpikleri belirginleştiren ve hacim veren uzun süre kalıcı maskara.",
  "eyeshadow palette with mirror":
    "Günlük ve özel makyajlar için aynalı far paleti.",
  "powder canister":
    "Makyajı sabitlemeye yardımcı hafif yapılı transparan pudra.",
  "red lipstick":
    "Yoğun renk veren, kremsi dokulu klasik kırmızı ruj.",
  "red nail polish":
    "Canlı kırmızı tonunda, parlak bitişli oje.",
  "calvin klein ck one":
    "Günlük kullanıma uygun ferah ve temiz notalara sahip unisex parfüm.",
  "chanel coco noir eau de":
    "Zarif ve sıcak notalarıyla öne çıkan sofistike parfüm.",
  "dior j'adore":
    "Çiçeksi notalara sahip, zarif ve feminen parfüm.",
  "dolce shine eau de":
    "Meyvemsi ve çiçeksi notaları bir araya getiren canlı bir koku.",
  "gucci bloom eau de":
    "Beyaz çiçek notalarıyla zengin, modern ve romantik bir parfüm.",
};

const categoryNames: Record<string, string> = {
  beauty: "Güzellik",
  fragrances: "Parfüm",
  electronics: "Elektronik",
  accessories: "Aksesuar",
  furniture: "Mobilya",
  groceries: "Market",
  "home-decoration": "Ev Dekorasyonu",
  "kitchen-accessories": "Mutfak Gereçleri",
  laptops: "Dizüstü Bilgisayar",
  smartphones: "Akıllı Telefon",
};

export function getProductImage(
  name: string,
  category: string,
  imageUrl?: string,
): string {
  return (
    imageUrl ??
    namedProductImages[name.toLocaleLowerCase("tr-TR")] ??
    categoryImages[category.toLowerCase()] ??
    fallbackImage
  );
}

export function getProductDisplayName(name: string): string {
  return productNames[name.toLowerCase()] ?? name;
}

export function getProductDisplayDescription(
  name: string,
  description: string,
): string {
  return productDescriptions[name.toLowerCase()] ?? description;
}

export function getCategoryDisplayName(category: string): string {
  return categoryNames[category.toLowerCase()] ?? category;
}
