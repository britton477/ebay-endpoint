const express = require('express');
const crypto = require('crypto');
const app = express();

const VERIFICATION_TOKEN = 'PokemonCards2025SecureTokenxK9mQ7bZ';
const ENDPOINT = 'https://ebay-verification-pjsm.onrender.com/';

app.get('/', (req, res) => {
  const challengeCode = req.query.challenge_code;
  
  if (challengeCode) {
    const hash = crypto.createHash('sha256')
      .update(challengeCode)
      .update(VERIFICATION_TOKEN)
      .update(ENDPOINT)
      .digest('hex');
    
    res.json({ challengeResponse: hash });
  } else {
    res.send('OK');
  }
});

app.post('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running'));
