import mongoose from "mongoose";
const password="asdfghjklqwertyuiop"
export const connectDB=async()=>{
    await mongoose.connect(`mongodb+srv://Apurba:${password}@cluster0.arbkwcq.mongodb.net/FoodyBangali`)
}