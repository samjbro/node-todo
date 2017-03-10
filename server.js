import express from "express";
import redis from "redis";
import bodyParser from "body-parser";

const app = express();
const client = redis.createClient();
client.hset("todos", 1, "first");

app.set("view engine", "ejs");
app.set("view options", { layout: false });
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req,res) => res.render("index"));

app.get("/todos", (req,res) => {
  client.hgetall("todos", (error,data) => {
    res.writeHead(200, "Content-type", "application/json; charset=utf-8");
    res.write(JSON.stringify(data));
    res.end();
  });
});

app.post("/todos/create", (req,res) => {
  let id = generateGUID();
  client.hset("todos", id, req.body.description);
  writeJSON(res, { id: id });
});

app.post("/todos/update", (req,res) => {
  client.hset("todos", req.body.id, req.body.description);
  res.end();
});

app.listen(2000);

function writeJSON(res, data) {
  res.writeHead(200, "Content-type", "application/json; charset-utf8");
  res.write(JSON.stringify(data));
  res.end();
}

function generateGUID() {
  return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    let rand = Math.random() * 16|0;
    let num = char === "y" ? (rand & 0x3 | 0x8) : rand;

    return num.toString(16).toUpperCase();
  });
}
