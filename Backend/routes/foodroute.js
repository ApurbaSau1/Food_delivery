import express from "express";
import { addFood, removeFood ,listFood,addMenu,listMenu,removeMenu} from "../controllers/foodControler.js";
import multer from "multer";

const foodRouter=express.Router();

//image Store
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload=multer({storage:storage})



foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.post("/addmenu",upload.single("image"),addMenu)
foodRouter.get("/list",listFood)
foodRouter.get("/listmenu",listMenu)
foodRouter.delete("/remove/:id",removeFood)
foodRouter.delete("/removemenu/:id",removeMenu)

export default foodRouter ;