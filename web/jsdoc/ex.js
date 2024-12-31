const { generateJWT, readJWT } = require("./lib/customcryptocopy");
const crypto = require('node:crypto');

const PublicKey = `MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEh1pPVTT+jLOJQvFsrArrFIQZ1Yf2FbXuBh7diN6XbaCaxk1NzWRvCFD8waLDQPRNrQcD+Gf2TajOso7b7LR4cg==`

generateJWT("HS256", "e56472d883e796425932ac6bd504d06a", PublicKey).then(res=>console.log(res))