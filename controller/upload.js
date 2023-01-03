const profileModel=require('../models/upload');
const mongoose=require('mongoose')
const User=require('../models/user')
const multer=require('multer');
 const path=require('path');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        console.log(file)
cb(null,Date.now()+path.extname(file.originalname))
    }
})

const fileFilter=(req,file,cb)=>{
    //reject a file
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype.split("/")[1] === "pdf"){
        cb(null,true) //
    }
    else{
        cb(null,false)
    }
}

exports.upload=multer({storage:storage,limits:{
fileSize:1024*1000},
fileFilter:fileFilter

}).single('imageUrl')




exports.postProfile=async(req,res)=>{


 const profile= new profileModel({
    imageUrl:req.file.path,
    userId:req.params.id,

 })

 profile.save().then((result)=>{
    res.status(200).send({message:"Profile is created",data:result})
 }).catch((err)=>{
    res.status(500).send(err)
 })
}


exports.editProfile=async(req,res)=>{
    const imageUrl=req.file.path
            
      
    const profile=await profileModel.findByIdAndUpdate(req.params.id,
    {$set:{imageUrl:imageUrl}}
        ).then((result)=>{
            res.status(200).send({data:result,message:"Profile picture is updated"})
        }).catch((err)=>{
          res.status(500).send({error:err})
        }) 

    }


exports.getprofile=async(req,res)=>{
  

        await profileModel.findById(req.params.id).populate('userId').exec().then((result)=>{
            res.status(200).send({data:result})
        }).catch((err)=>{
            res.status(500).send({
                error:err
            })
        })
    
    

}




