const mongoose=require('mongoose');
const config=require('./db.config');
const dbConn=async()=>{
    try{
        await mongoose.connect(config.uri,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false},()=>{
            console.log('CONNECTED TO THE DATABSE ! Hurrah !');
        })
    }catch(err){
        console.log(err);
    }
}

module.exports=dbConn;