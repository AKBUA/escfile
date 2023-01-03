const userModel=require('../models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const access_secret='abhishek'

exports.createUser=async(req,res)=>{

    const {userName,password}=req.body;

    if(!userName && !password){
        res.send('All field are required')
    }


    const salt=await bcrypt.genSalt(10);
    const bcryptedpassword=await bcrypt.hash(password,salt);

    

    const user=new userModel(
        {
           
            userName:userName,
          
            password:bcryptedpassword

        }
    )

      const token=jwt.sign({username:userName},access_secret)


    user.save().then((data)=>{
        res.status(200).send({data:data,token:token})
    }).catch((e)=>{
        console.log(e)
    
 res.status(403).send(e)
    })
}

exports.getUser=async(req,res)=>{
    const {id}=req.params
     const user= await userModel.findById({_id:id});
     res.status(200).send({user:user})

}

exports.getLogOut=async(req,res)=>{


    await userModel.findById(req.params.id).then((result)=>{
        res.status(200).send({
            Logout:"Logout from this device or Logout of all devices"
        })
    }).catch((err)=>{
        res.status(500).send({
            error:err
        })
    })
}