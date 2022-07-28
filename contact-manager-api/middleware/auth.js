const jwt=require('jsonwebtoken');
const secretKey="dsvdhbs@audhuh326536dasbf#hdbcxvjck";
const auth=async (req,res,next)=>{
    if(req.header('x-auth-token'))
    {
        const token=req.header('x-auth-token');
        try{
            const match= await jwt.verify(token,secretKey);
            next()
        }catch(err){
            console.log(err)
            res.status(401).json({
                message:"Unauthorised Request ! Bad Token."
            })
        }
    }
    else
    {
        res.status(401).json({
            message:"Unauthorised Request ! Token Missing."
        })
    }
}

module.exports=auth ;