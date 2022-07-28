const express=require('express');
const app=express();
const logger=require('./middleware/logger');
const contactsRoute=require('./routes/contacts');
const userRoute=require('./routes/user') ;
const cors=require('cors');
const dbConn=require('./config/db.conn') ;
const port=process.env.PORT || 4400 ;
let contactsData=[];
const corsOption={
    "origin":"*"
}
 
app.use(cors(corsOption));
app.use(logger);
app.use(express.json());
app.use('/api/contacts',contactsRoute);
app.use('/api/user',userRoute);

dbConn();

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})