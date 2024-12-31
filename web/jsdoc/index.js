const express = require("express");

const crypto = require('node:crypto');
const fs = require("fs")
const cookieParser = require("cookie-parser");
const { generateJWT, readJWT } = require("./lib/customcrypto");

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = 4000;

const flag = "DH{REDACTED}";
const PrivateKey = `REDACTED`
const PublicKey = `MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEh1pPVTT+jLOJQvFsrArrFIQZ1Yf2FbXuBh7diN6XbaCaxk1NzWRvCFD8waLDQPRNrQcD+Gf2TajOso7b7LR4cg==`

app.set("view engine", "ejs");

let db = {
    admin: { uid: "e56472d883e796425932ac6bd504d06a", pw: crypto.randomBytes(16).toString('hex'), name: "Lee Admin", isVerified: true, webhookURL: "http://localhost:4001/get_data" }
}
Object.freeze(Object.prototype)

let temporaryFileName = crypto.randomBytes(10).toString('hex')


const GenerateSecureRand = () => {
    return new Promise((resolve, _) => {
        let data = ""
        for (var i = 0; i < 1000; i++) {
            data += crypto.randomBytes(1000).toString('hex')[0]
        }
        const hash = crypto.createHash('sha512').update(data)
        let q = hash.digest('hex')

        resolve(q.slice(0, 16))
    })
}

app.post("/login", async (req, res) => {
    try{
        const { id, pw } = req.body

        if (!(Object.keys(db).includes(id))) {
            res.json({ message: "invalid id" })
            return
        }
    
        if (db[id]["pw"] == pw) {
            let token = await generateJWT("ES256", db[id]["uid"], PrivateKey) //using ECDSA P-256 curve + SHA-256
            res
                .cookie("auth", token, {
                    maxAge: 30000,
                }, { algorithm: 'HS256' }).json({ message: "success" })
            return
        } else {
            res.json({ message: "invalid pw" })
            return
        }
    }catch(e){
        res.json({ message: "failed" })
    }
})


app.post("/register", async (req, res) => {
    try{
        const { id, data } = req.body
        const allowedKey=["pw","name","isVerified","webhookURL"]
    
        console.log(db);
        console.log(id.toLowerCase());
        if (id.toLowerCase() == "admin" || Object.keys(db).includes(id)) {
            res.json({ message: "unallowed key" })
            return
        }
    
        db[id] = {}
    
        for (const key of Object.keys(data)) {
            if(allowedKey.indexOf(key)!=-1){
                db[id][key] = data[key]
            }
        }
    
        db[id]["uid"] = crypto.randomBytes(16).toString('hex')
    
        res.json({ message: "success" })
    }catch(e){
        res.json({ message: "failed" })
    }

})


app.post("/2fa", async (req, res) => {
    const token = req.cookies.auth ?? "";
    let data = ""
    try {
        data = await readJWT(token, PublicKey)
    } catch (e) {
        res.json({ message: "unauthorized" })
        return
    }

    console.log(db)
    console.log(data)
    if (db.admin.uid != data.uid) {
        res.json({ message: "no permission" })
        return
    }
    const targetFile = await fs.promises.open(temporaryFileName, 'w')
    const start = new Date().getMilliseconds(); // 측정 시작
    let rand_data = await GenerateSecureRand()
    const end = new Date().getMilliseconds(); // 측정 종료
    const time = end - start;
    console.log(`${time} ms`);
    if (new URL(db.admin.webhookURL).hostname !== "localhost") {
        res.json({ message: "webhook validation failed" })
        return
    }
    await fetch(db.admin.webhookURL, { method: "POST", body: JSON.stringify({ auth_key: rand_data }), headers: { "Content-Type": "application/json" } })
    await targetFile.write(rand_data)
    await targetFile.close()
    res.json({ message: "success" })
    return
})

app.post("/validate", async (req, res) => {
    const token = req.cookies.auth ?? "";
    let data = ""
    try {
        data = await readJWT(token, PublicKey)
    } catch (e) {
        res.json({ message: "unauthorized" })
        return
    }

    if (db.admin.uid != data.uid) {
        res.json({ message: "no permission" })
        return
    }
    try {
        const { data } = req.body
        const targetFile = await fs.promises.readFile(temporaryFileName)
        await fs.promises.unlink(temporaryFileName)
        temporaryFileName = crypto.randomBytes(10).toString('hex')
        console.log(targetFile)
        if (data == targetFile) {
            res.json({ flag: flag })
            return
        } else {
            res.json({ message: "invalid token" })
            return
        }
    } catch (e) {
        res.json({ message: "internal error" })
        return
    }
})



/*
Internal Service
*/

app.use(express.urlencoded({ extended: true }));

app.listen(port);


const app2 = express()

app2.use(express.json());

app2.post("/get_data", async (req, res) => {

    const key = req.body.auth_key
    if (key) {
        console.log(key)
        res.status(200);
        res.send('success');
        return
    } else {
        res.status(400);
        res.send('failed');
        return
    }

})


app2.listen(4001);