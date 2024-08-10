# React Authentication App

Bu proje, basit bir kullanıcı kaydı ve giriş sistemi uygulamasıdır. Kullanıcılar, kullanıcı adı ile kayıt olabilir ve ardından sağlanan QR kodunu taratarak giriş yapabilirler.

## Özellikler

- Kullanıcı adı ile kayıt olma
- QR kodu alma
- Kullanıcı adı ve QR kodu ile giriş yapma
- Başarı ve hata mesajları gösterme

## Kurulum

1. Bu proje için gerekli olan `node` ve `npm` (veya `yarn`) yüklü olduğundan emin olun.
2. Proje klasörüne gidin ve gerekli paketleri yüklemek için aşağıdaki komutu çalıştırın:

    ```bash
    npm install
    ```

    veya

    ```bash
    yarn install
    ```

## Kullanım

1. Geliştirme sunucusunu başlatmak için aşağıdaki komutu çalıştırın:

    ```bash
    npm run dev
    ```

    veya

    ```bash
    yarn start
    ```

2. Tarayıcınızda `http://localhost:3000` adresine gidin.

## API Uç Noktaları

- **Kayıt Ol**: 
  - **URL**: `https://react-authentication-backend.vercel.app/api/register`
  - **Yöntem**: `POST`
  - **Gövde**:
    ```json
    {
      "username": "kullanıcı_adı"
    }
    ```
  - **Yanıt**:
    ```json
    {
      "qrCodeUrl": "QR kodu URL'si"
    }
    ```

- **Giriş Yap**:
  - **URL**: `https://react-authentication-backend.vercel.app/api/login`
  - **Yöntem**: `POST`
  - **Gövde**:
    ```json
    {
      "username": "kullanıcı_adı",
      "authKey": "QR kodu"
    }
    ```
  - **Yanıt**:
    ```json
    {
      "message": "Başarı veya hata mesajı"
    }
    ```

## Bileşenler

- `App` bileşeni:
  - Kullanıcı adı ve QR kodu ile kayıt ve giriş işlemlerini sağlar.
  - Kayıt ve giriş işlemleri için `fetch` API'sini kullanır.
  - Kullanıcı arayüzünde, kullanıcı adı girişi, kayıt butonu, QR kodu görüntüleme ve giriş yapma alanlarını içerir.
