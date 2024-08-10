const express = require('express');
const bodyParser = require('body-parser');
const otplib = require('otplib');
const qrcode = require('qrcode');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const users = {}; // örnek kullanıcılar

app.post('/api/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Kullanıcı adı gereklidir' });
  }

  if (users[username]) {
    return res.status(400).json({ message: 'Kullanıcı zaten kayıtlı' });
  }

  const secret = otplib.authenticator.generateSecret();
  users[username] = { secret };

  const otpauth = otplib.authenticator.keyuri(username, 'React-App', secret);
  qrcode.toDataURL(otpauth, (err, qrCodeUrl) => {
    if (err) {
      return res.status(500).json({ message: 'QR kodu oluşturulamadı' });
    }

    res.json({ message: 'QR kodu oluşturuldu', qrCodeUrl });
  });
});

app.post('/api/login', (req, res) => {
  console.log('Login request body:', req.body);

  const { username, authKey } = req.body;
  console.log('Extracted values:', { username, authKey });
  if (!username || !authKey) {
    return res.status(400).json({ message: 'Eksik kullanıcı adı veya kod' });
  }

  const user = users[username];

  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  const isValid = otplib.authenticator.check(authKey, user.secret);

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
