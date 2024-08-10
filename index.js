const express = require('express');
const bodyParser = require('body-parser');
const otplib = require('otplib');
const qrcode = require('qrcode');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

const users = {
    "emr":
    {
        "secret": "secret"
    }
};

app.post('/api/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Kullanıcı adı gereklidir' });
  }

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

// POST /api/login endpoint'i
app.post('/api/login', (req, res) => {
  const { username, authkey } = req.body;

  if (!username || !authkey) {
    return res.status(400).json({ message: 'Eksik kullanıcı adı veya kod' });
  }

  const user = users[username];

  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  // Kodun geçerli olup olmadığını kontrol etme
  const isValid = otplib.authenticator.check(authkey, user.secret);

  if (isValid) {
    res.json({ message: 'Giriş başarılı!' });
  } else {
    res.status(401).json({ message: 'Geçersiz kod' });
  }
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
