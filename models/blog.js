const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true,
        maxLength : 20,
    },
    message : {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 50,
    },
    created_at : {
        type : Date,
        required : true,
    }
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;