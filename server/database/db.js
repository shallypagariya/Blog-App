import mongoose from "mongoose"
const Connection=async(username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@mernproj.vypxatk.mongodb.net/?retryWrites=true&w=majority&appName=MernProj`
    try{
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log("Database connected successfully ")
    }catch(error){
console.log("Error while connecting with the Database...please try again !!",error);
    }

    
}
export default  Connection;