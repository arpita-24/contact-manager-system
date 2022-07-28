const User=require('../models/user');
const bcrypt=require('bcryptjs');
const joi=require('joi');
const jwt=require('jsonwebtoken');
const secretKey="dsvdhbs@audhuh326536dasbf#hdbcxvjck"

exports.register=async (req,res)=>{
    const userSchema=joi.object({
        fullname:joi.string().required().min(3),
        email:joi.string().email().required(),
        password:joi.string().min(6).max(10)
    })
    try{
        
        
        let userfields = await userSchema.validateAsync(req.body);
        let user= await User.findOne({email:userfields.email}); //problem here
        console.log("Hey, Here");
        if(!user)
        {
            user=new User(userfields);
            const salt= await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(user.password,salt);
            await user.save();
            
            res.status(200).json({
                message:"User logged in successfully.",
                user
            })
        }
        else
        {
            res.status(400).json({
                message:"User already exists."
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went wrong !",
            error: err
        })
        console.log(error)
    }
}
exports.login=async (req,res)=>{
    const loginSchema=joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    })
    try{

        let loginfields = await loginSchema.validateAsync(req.body);
        let user = await User.findOne({email:loginfields.email});
        if(!user)
        {
            res.status(400).json({
                message:"Username/password is incorrect."
            })
        }
        else
        {
            const match=await bcrypt.compare(loginfields.password,user.password);
            if(!match)
            {
                res.status(400).json({
                    message:"Username/password is incorrect."
                })
            }
            else
            {
                const payload={
                    userdata:{
                        id:user._id 
                    }
                }
                const token= await jwt.sign(payload,secretKey,{expiresIn:7200});
                res.status(200).json({
                    message:"Logged In Successfully",
                    user:{id:user._id,name:user.fullname},
                    token
                })
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Something went wrong !",
            error: err
        })
    }
}
exports.allUsers= async (req,res)=>
{

    try{
        
        let user=await User.find();
        
        if(!user)
        {
            user=[];
        }
       
        res.status(200).json({
            message: "All User Details fetched successfully.",
            userData: user
        })
        

    }catch(err){
        res.status(500).json({
            message: "Something went wrong !",
            error:err
        })
    }
}