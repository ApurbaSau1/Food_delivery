import mongoose from "mongoose";

const foodListSchema=new mongoose.Schema({
    menu_name:{type:String,required:true},
    image:{type:String,required:true},
})

const foodListModel=mongoose.models.foodList||mongoose.model("foodList",foodListSchema)
export default foodListModel;