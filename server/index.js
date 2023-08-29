const express = require("express");
const cors = require("cors");
const NodeRSA = require("node-rsa");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

const resDecrypt = (text, key) => {
  let keyPrivate = new NodeRSA(key);
  let decrypt = keyPrivate.decrypt(text, "utf8");
  return decrypt;
};

const rsaKeys = () => {
  const keys = new NodeRSA({ b: 1024 });
  const publicKey = keys.exportKey("public");
  const privateKey = keys.exportKey("private");
  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
};

app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.get("/register", (req, res) => {
  const rsa = rsaKeys();
  const dbSecretKey = rsa.privateKey;
  try {
    const filePath = `${__dirname}/public/${req.body.address}.ppk`;
    fs.writeFileSync(filePath, dbSecretKey);
    console.log(dbSecretKey);
    res.status(201).json({
      publicKey: rsa.publicKey,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/decrypt", (req, res) => {
  const body = req.body;
  //read the private key
  let dbSecretKey;
  try {
    dbSecretKey = fs.readFileSync(`${body.address}.ppk`);
    console.log(body.encryptedMessage);
    console.log(resDecrypt(body.encryptedMessage, dbSecretKey));
    res.status(200).json({
      message: resDecrypt(body.encryptedMessage, dbSecretKey),
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});
