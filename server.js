import express from "express";
import redis from "redis";

const app = express();
const client = redis.createClient();
client.hset("todos", 1, "first");

app.set("view engine", "ejs");
app.set("view options", { layout: false });
app.use("/public", express.static("public"));

app.get("/", (req,res) => res.render("index"));

app.get("/todos", (req,res) => {
  client.hgetall("todos", (error,data) => {
    res.writeHead(200, "Content-type", "application/json; charset=utf-8");
    res.write(JSON.stringify(data));
    res.end();
  });
});

app.listen(2000);
