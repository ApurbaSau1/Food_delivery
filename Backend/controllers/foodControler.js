import { log } from "console";
import foodModel from "../models/foodModel.js";
import MenuModels from "../models/MenuModel.js";

import fs from 'fs'

//add food item
const addFood= async(req,res)=>
{

const image=req.file.filename;

const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image
})
try{
    await food.save();
    // console.log(food);    
    res.json({success :true,message:"Food item added successfully"})
}
catch(error){
    res.json({success :false,message:"Some Error"})
    // console.log(error);
}
}

//add menu item
const addMenu= async(req,res)=>
{
    const image=req.file.filename;

    const foodList=new MenuModels({
        menu_name:req.body.name,
        image:image
    })
    try{
        await foodList.save();
        res.json({success :true,message:"Menu item added successfully"})
    }
    catch(error){
        res.json({success :false,message:"Some Error"})
    }
}

//list menu items
const listMenu= async(req,res)=>
{
    try{
        const menu= await MenuModels.find();
        res.json({success :true,menu})
    }
    catch(error){
        res.json({success :false,message:"Error"})
    }
}

//list food items

const listFood= async(req,res)=>
{
    try{
        
        const foods= await foodModel.find();
        res.json({success :true,foods})
        
        // console.log(`List Food called ${foods.length} times`);
    }
    catch(error){
        console.log(error);
        res.json({success :false,message:"Error"})

    }
   
}
//remove food items
const removeFood= async(req,res)=>
{
    const foodId=req.params.id;
    // console.log(req.params);
      
    try{
        const food= await foodModel.findByIdAndDelete({_id:foodId});
        if(food){
            //remove image from uploads folder
            fs.unlinkSync(`uploads/${food.image}`);
            res.json({success :true,message:"Food item removed successfully"})
        }else{
            res.json({success :false,message:"Food item not found"})
        }
    }
    catch(error){
        // console.log(error);
        res.json({success :false,message:"Error"})
    }
}

const removeMenu= async(req,res)=>
{
    const menuId=req.params.id;
    try{
        const menu= await MenuModels.findByIdAndDelete({_id:menuId});
        if(menu){
            fs.unlinkSync(`uploads/${menu.image}`);
            res.json({success :true,message:"Menu item removed successfully"})
        }else{
            res.json({success :false,message:"Menu item not found"})
        }
    }
    catch(error){
        res.json({success :false,message:"Error"})
    }
}

export {addFood,listFood,removeFood,addMenu,listMenu,removeMenu};