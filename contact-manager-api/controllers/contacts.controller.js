const Contact=require('../models/contact') ;
const bcrypt=require('bcryptjs');
const joi=require('joi');
const jwt=require('jsonwebtoken');
const secretKey="dsvdhbs@audhuh326536dasbf#hdbcxvjck"
exports.listContactsById=async (req,res)=>
{
    
    try{
        
        var contact=await Contact.find({userID:req.params.userid}).populate('userID');
        
        if(!contact)
        {
            contact=[]
        }

        res.status(200).json({
            message: "Contact information fetched successfully.",
            contactsData: contact
        })
        

    }catch(err){
        res.status(500).json({
            message: "Something went wrong !",
            error:err
        })
    }
}

exports.addContact= async (req,res)=>
{
    const contactObj=joi.object({
        userID:joi.string().required(),
        contactName:joi.string().required(),
        contactEmail:joi.string().required(),
        contactPhone:joi.string().required(),
        contactType:joi.string().required()
    })

    try{
        
        console.log(req.body)
        const contactfield = await contactObj.validateAsync(req.body);
        console.log(req.body)
        const contct = new Contact(contactfield);
        await contct.save();
        

        res.status(200).json({
            message: "Contact information saved successfully.",
            contactsData: contct
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something went wrong ."
        })

    }

}

exports.editContact= async (req,res)=>
{
    let id=req.params.id;
    const contactObj=joi.object({
        userID:joi.string().required(),
        contactName:joi.string().required(),
        contactEmail:joi.string().required(),
        contactPhone:joi.string().required(),
        contactType:joi.string().required()
    })
    try{
        const updateField= await contactObj.validateAsync(req.body);
        const updatedContact = await Contact.findByIdAndUpdate(id,{$set:updateField});

        if(updatedContact==null)
        {
            res.status(400).json({
                message: "Contact information did not get updated / ID Not Found !"
            })
        }
        else
        {
            res.status(200).json({
                message: "Contact information updated successfully!",
                updatedContact: updatedContact
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something went wrong",
            error:err
        })
    }
        

}
exports.deleteContact=async (req,res)=>
{
        var id=req.params.id;

        try{
            const deletedContact=await Contact.findByIdAndDelete(id);
    
            if(deletedContact==null)
            {
                res.status(400).json({
                    message: "Contact information did not get deleted / ID Not Found !"
                })
            }
            else
            {
                res.status(200).json({
                    message: "Contact information deleted successfully!"
                })
            }
        }catch(err){
            res.status(500).json({
                message: "Something went wrong",
                error:err
            })
        }
}
exports.getContactById = async(req,res)=>{
    let contactId = req.params.contactId;
    try{
        const getContact = await contact.find({userID:contactId}).populate('userID');
        
        if(getContact.length!=0)
        {
            res.status(200).json({
                message : "Contact fetched successfully",
                contactData : getContact
            });
        }
        else
        {
            res.status(404).json({
                message : "Contact not found !"
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Something went wrong",
            error : err
        });
    }
}