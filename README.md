# E-Ticaret Backend

Java 17 ve Spring Boot ile hazırlanmış, giriş/kayıt içermeyen temel bir e-ticaret REST API'si. Proje; controller, service ve repository katmanlarını, ürün yönetimini ve sipariş oluşturmayı örnekler.

## Çalıştırma

1. DBeaver'da yerel PostgreSQL sunucuna bağlanıp `ecommerce_cv_db` adında bir veritabanı oluştur:

   ```sql
   CREATE DATABASE ecommerce_cv_db;
   ```

2. IntelliJ Run Configuration ortam değişkenlerinde `DB_USERNAME=postgres`, kendi parolanla `DB_PASSWORD` ve `DB_URL=jdbc:postgresql://localhost:5432/ecommerce_cv_db` tanımla. Alternatif olarak proje klasöründe PowerShell ile:

```powershell
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="kendi-postgresql-parolan"
$env:DB_URL="jdbc:postgresql://localhost:5432/ecommerce_cv_db"
.\mvnw.cmd spring-boot:run
```

Uygulama `http://localhost:8080` adresinde çalışır. Veriler PostgreSQL'de kalıcı olarak saklanır ve tablolar ilk açılışta otomatik oluşturulur. Örnek ürünler veritabanı boşsa eklenir. Varsayılan bağlantı `localhost:5432/ecommerce_cv_db` adresini kullanır; farklı bir bağlantı için `DB_URL` ortam değişkenini ayarla. Parola kaynak kodda tutulmaz.

## Postman

İstekleri `http://localhost:8080` temel adresiyle gönder. Önce `POST /api/products` ile ürün oluştur, yanıttaki `id` değerini `POST /api/orders` gövdesindeki `productId` alanında kullan. Ürün ve sipariş istek örnekleri aşağıda verilmiştir.

## React mağaza arayüzü

Spring Boot uygulaması çalışırken ayrı bir terminalde `frontend` klasörüne geç:

```powershell
cd frontend
npm install
npm run dev
```

Arayüz `http://localhost:5173` adresinde açılır. Ürünleri backend API'sinden çeker; sepet Redux Toolkit ile yönetilir ve siparişler mevcut `/api/orders` API'sine gönderilir. Üye girişi/kayıt yoktur. Ayrıntılar için `frontend/README.md` dosyasına bak.

## API

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/products` | Ürünleri listeler |
| GET | `/api/products?category=Ev` | Kategoriye göre filtreler |
| GET | `/api/products/{id}` | Ürün detayını getirir |
| POST | `/api/products` | Ürün ekler |
| PUT | `/api/products/{id}` | Ürünü günceller |
| DELETE | `/api/products/{id}` | Ürünü siler |
| POST | `/api/orders` | Sipariş oluşturur, toplam tutarı hesaplar ve stoktan düşer |
| GET | `/api/orders` | Siparişleri listeler |
| GET | `/api/orders/{id}` | Sipariş detayını getirir |

### Örnek ürün isteği

```json
{
  "name": "Masa Lambası",
  "description": "Ayarlanabilir LED masa lambası",
  "price": 599.90,
  "stock": 8,
  "category": "Ev"
}
```

### Örnek sipariş isteği

```json
{
  "customerName": "Ada Yılmaz",
  "customerEmail": "ada@example.com",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

İstek gövdeleri doğrulanır; bulunamayan kayıtlar ve yetersiz stok anlamlı HTTP hata yanıtlarıyla döner.

## Railway + Vercel ile yayınlama

Projeyi GitHub'a gönderirken `new` klasörünü depo kökü yapman en kolayıdır. Depo kökünde `pom.xml`, `Dockerfile` ve `frontend` klasörü bulunmalı.

1. Railway'de yeni bir proje oluşturup **PostgreSQL** servisi ekle. Ardından aynı projeye GitHub deposundan bir servis ekle; backend servisinin **Root Directory** alanı depo kökü olan `new` olmalı. Railway bu klasördeki `Dockerfile` ile backend'i derleyip başlatır.
2. Railway PostgreSQL servisine bağlı backend servisinin değişkenlerine Postgres servisinden şu değişkenleri referansla: `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`. Railway arayüzünde her birinin değerini PostgreSQL servisindeki aynı isimli değişkene bağla. `FRONTEND_URL` değerini Vercel sitesi yayınlanınca oluşan tam origin'e ayarla, örneğin `https://magaza-ornek.vercel.app` (sonunda `/` olmadan).
3. Backend servisini deploy et. Railway'in verdiği public domain'i kopyala; örneğin `https://api-ornek.up.railway.app`. Bu adresin sonuna `/api/products` ekleyerek tarayıcıda aç. Ürün JSON'u gelmeli. İlk açılışta başlangıçtaki üç örnek ürün PostgreSQL'e eklenir.
4. Vercel'de aynı GitHub deposunu import et. **Root Directory** olarak `new/frontend` seç; framework `Vite`, build command `npm run build`, output directory `dist` olsun.
5. Vercel proje ayarlarında şu environment variable'ları ekle ve yeniden deploy et:

   ```text
   VITE_CATALOG_API_URL=https://api-ornek.up.railway.app
   VITE_ORDER_API_URL=https://api-ornek.up.railway.app
   ```

   İki değerde de kendi Railway backend domain'ini kullan. Canlı Vercel origin'ini Railway'deki `FRONTEND_URL` ile aynı yaz.

6. Vercel domain'ini açıp ürünlerin geldiğini ve bir test siparişinin oluştuğunu kontrol et. Railway'in ücretsiz servisleri uykuya geçebilir veya plan/depolama kotaları olabilir; canlı tutmak için platformun güncel plan koşullarını kontrol et.

Yerel PostgreSQL veritabanındaki kayıtlar Railway veritabanına otomatik kopyalanmaz. İstersen Railway backend'i çalıştıktan sonra demo kataloğu eklemek için `frontend` klasöründe PowerShell'den çalıştır:

```powershell
$env:API_BASE_URL="https://api-ornek.up.railway.app"
$env:IMPORT_LIMIT="60"
npm run import:demo-products
```

Bu komut mevcut isimleri atlar; canlı veritabanına örnek kayıt ekler. Önce public API adresinin doğru olduğundan emin ol.
