const express = require('express');
const bodyParser = require('body-parser');
const otplib = require('otplib');
const qrcode = require('qrcode');
const cors = require('cors');

const app = express();
const port = 3000;

// Body-parser middleware'ini kullanarak JSON verilerini işleyebilmek için
app.use(bodyParser.json());
app.use(cors()); // CORS ayarları

// Kullanıcı verilerini saklamak için basit bir veri yapısı (gerçek uygulamalarda veritabanı kullanmalısınız)
const users = {};

// POST /api/register endpoint'i
app.post('/api/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Kullanıcı adı gereklidir' });
  }

  // Kullanıcı zaten mevcutsa yeni bir kayıt yapma
  if (users[username]) {
    return res.status(400).json({ message: 'Kullanıcı zaten kayıtlı' });
  }

  // Gizli anahtar üretme ve kullanıcı verilerini saklama
  const secret = otplib.authenticator.generateSecret();
  users[username] = { secret };

  // QR kodu oluşturma
  const otpauth = otplib.authenticator.keyuri(username, 'MyApp', secret);
  qrcode.toDataURL(otpauth, (err, qrCodeUrl) => {
    if (err) {
      return res.status(500).json({ message: 'QR kodu oluşturulamadı' });
    }

    res.json({ message: 'QR kodu oluşturuldu', qrCodeUrl });
  });
});

app.post('/api/login', (req, res) => {
  const { username, authkey } = req.body;

  console.log('Login request received with:', { username, authkey });

  if (!username || !authkey) {
    return res.status(400).json({ message: 'Eksik kullanıcı adı veya kod' });
  }

  const user = users[username];

  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  // Kodun geçerli olup olmadığını kontrol etme
  const isValid = otplib.authenticator.check(authkey, user.secret);

  console.log('Auth key validation result:', isValid);

  if (isValid) {
    res.json({ message: 'Giriş başarılı!' });
  } else {
    res.status(401).json({ message: 'Geçersiz kod' });
  }
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
