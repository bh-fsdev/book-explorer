import mongoose from 'mongoose';

const bookSchema=mongoose.Schema({
    title:String,
    price:String,
    inStock:{
        type:Boolean,
        default:false //now here we check the false->out of stock other wise true->in stock
    },
    rating:Number,
    booklink:{
        type:String,
        unique:true
    },
    thumbnail:String
},{timestamps:true});

const Book=mongoose.model("Book",bookSchema);
export default Book;