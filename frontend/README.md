# Sepetim Frontend

Spring Boot e-ticaret API'si için TypeScript, React, Redux Toolkit ve Material UI ile hazırlanmış mağaza arayüzü.

## Çalıştırma

1. IntelliJ'den Spring Boot backend'ini başlat (`http://localhost:8080`).
2. Bu klasörde terminal açıp çalıştır:

   ```bash
   npm install
   npm run dev
   ```

3. `http://localhost:5173` adresini aç.

İsteğe bağlı olarak daha geniş demo kataloğu almak için backend çalışırken bir terminalde `npm run import:demo-products` çalıştır. Komut ilk 60 DummyJSON ürününü ekler, mevcut ürün adlarını atlayarak tekrar çalıştırıldığında kopya oluşturmaz. Daha az/çok ürün için `IMPORT_LIMIT` ortam değişkenini kullanabilirsin. Mağazada sayfalama ürün sayısına göre otomatik görünür.

Üst menüden mağazaya, iletişim sayfasına ve sepete geçebilirsin. Ürün adına tıklayarak ürün detay sayfasını aç. Sepet sayfasında ürün adetleri ve ürün silme işlemleri Redux Toolkit ile yönetilir. Sipariş oluşturma backend'in `/api/orders` endpoint'ini kullanır.

## Yapı

- `pages/StorePage.tsx`: ürün listeleme ve sayfa akışı
- `features/products`: ürün kartları, filtreler ve katalog API istemcisi
- `features/cart`: Redux Toolkit sepeti ve sepet çekmecesi
- `features/orders`: sipariş API istemcisi ve sipariş formu
- `components/layout`: sayfa başlığı, hero ve alt bilgi gibi ortak bölümler
- `services/httpClient.ts`: ortak HTTP hata işleme

Ürün ve sipariş istemcileri ayrı tutulur. Yerelde ikisi de Vite üzerinden Spring Boot'a yönlendirilir. İleride servisler ayrılırsa `.env` dosyasında `VITE_CATALOG_API_URL` ve `VITE_ORDER_API_URL` tanımlanabilir; ayrı origin kullanan backend'lerde frontend origin'i için CORS da açılmalıdır.

Demo katalog resimleri DummyJSON'dan ürün adı eşleşmesiyle gösterilir; ürün taraması bu harici görsel kaynağı erişilemez olsa da çalışır.

Sepet şu an bellekte tutulur ve sayfa yenilenince temizlenir. Sipariş için ad ve e-posta alınır; kullanıcı hesabı oluşturulmaz.

İletişim formu gerçek bir mail sunucusuna bağlı değildir; form cihazdaki e-posta uygulamasını açar. Kullanılacak adresi `frontend/.env` içindeki `VITE_CONTACT_EMAIL` ile ayarla.

## Vercel

GitHub deposunu Vercel'e import et; Root Directory `new/frontend`, Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist` olsun. Project Settings → Environment Variables içine aşağıdakileri Railway backend domain'inle ekleyip yeniden deploy et:

```text
VITE_CATALOG_API_URL=https://SENIN-BACKENDIN.up.railway.app
VITE_ORDER_API_URL=https://SENIN-BACKENDIN.up.railway.app
```

`vercel.json`, React Router sayfalarının doğrudan URL ile açılabilmesi için SPA rewrite içerir. Canlı sitenin origin'ini Railway backend'inde `FRONTEND_URL` olarak da ayarla.
