const express=require('express');
const router=express.Router();
const profileController=require("../controller/upload");

router.post('/profile/:id',profileController.upload,  profileController.postProfile);
router.get('/profile/:id',profileController.getprofile)

module.exports=router;