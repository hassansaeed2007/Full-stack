import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Title is required"],
        maxLength : [50, "Should not exceed 50 characters"]
    },
    description : {
        type : String,
        required : [true, "Description is required"]
    },
    price : {
        type : Number,
        required : [true, "Price is required"],
        maxLength : [6, "should not exceed 6 characters"]
    },
    category : {
        type : String,
        required : [true, "Category is required"]
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String, 
                required : true
            }
        }
    ],
    ratings : {
        type : Number,
        default : 0
    },
    stocks : {
        type : Number,
        maxLength : 5,
        default : 1
    },
    numOfReviews : [
        {
            name : {
                type : String,
                required : true
            },
            comment : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
        }
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
});

const Product = new mongoose.model("Product", productSchema);
export default Product

// let num = Number(prompt("Enter number")) // "90"