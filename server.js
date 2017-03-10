import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("view options", { layout: false });
app.use("/public", express.static("public"));

app.get("/", (req,res) => res.render("index"));

app.listen(2000);
