const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const multer=require('multer');
const upload=multer({dest:"uploads/"});
const contactsController=require('../controllers/contacts.controller')

router.get('/:userid',auth,contactsController.listContactsById);

router.get('/:userid',auth,contactsController.getContactById);

router.post('/save',auth,contactsController.addContact);

router.put('/update/:id',auth,contactsController.editContact);

router.delete('/delete/:id',auth,contactsController.deleteContact);

router.post('/upload',upload.single('imagefile'),(req,res)=>{
    res.status(200).json({
        details:req.file
    })
});

module.exports = router ;