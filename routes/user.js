const express=require('express');
const router=express.Router();
const userController=require("../controller/user");

router.post('/user',userController.createUser);
router.get('/user/:id',userController.getUser);
router.get('/user/logout/:id',userController.getLogOut);

module.exports=router;