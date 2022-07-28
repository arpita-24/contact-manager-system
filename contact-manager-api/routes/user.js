const express=require('express');
const router=express.Router();
// const fs=require('fs');
const userController=require('../controllers/user.controller');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/getAllUsers',userController.allUsers);

module.exports=router ;