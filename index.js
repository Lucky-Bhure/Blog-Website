const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Blog = require("./models/blog.js");
const methodOverride = require('method-override')

const app = express();
const Port = 8080;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json())

main()
.then((res) => {
    console.log("Database Connected Successfully.");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog");
};

app.get("/",async(req, res) => {
    let blogs = await Blog.find();
    res.render("index.ejs",{ blogs });
});

app.get("/newBlog", (req,res) => {
    res.render("newBlog.ejs");
})

app.post("/newBlog",(req, res) => {
    let {from, message} = req.body;
    let newBlog = new Blog({
        from : from,
        message : message,
        created_at : new Date(),
    });
    newBlog.save().then((res) => {
        console.log("New Blog Created Successfully.")
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/");
});

app.get("/:id/edit",async(req,res) => {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    res.render("edit.ejs", { blog });
});

app.put("/:id", async(req, res) => {
    const { id } = req.params;
    let { message:newMsg } = req.body;
    let blogUpdated = await Blog.findByIdAndUpdate(id, {message : newMsg}, { runValidators: true, new: true });
    console.log(blogUpdated);
    res.redirect("/");
});

app.delete("/delete/:id", async(req,res) => {
    let { id } = req.params;
    let blogDelete = await Blog.findByIdAndDelete(id, { runValidators: true });
    console.log(blogDelete);
    res.redirect("/");
});

app.listen(Port,() => {
    console.log(`Server is running at http://localhost:${Port}`);
});