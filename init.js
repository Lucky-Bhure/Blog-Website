const mongoose = require("mongoose");
const Blog = require("./models/blog");

main().then((res) => {
    console.log("Database Connected Successfully.");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog");
}

const allBlog = [
    {
       from : "Iron Man",
       message : "I am Iron Man",
       created_at : new Date() 
    },
    {
        from : "Captain America",
        message : "I can do it all day.",
        created_at: new Date()
    },
    {
        from : "Spider Man",
        message : "Great power comes with great responsibilities.",
        created_at : new Date() 
    },
    {
        from : "Hulk",
        message : "Let's Smash.",
        created_at : new Date() 
    },
    {
        from : "Thor",
        message : "I am god of thunder.",
        created_at : new Date() 
     },
];


Blog.insertMany(allBlog);



