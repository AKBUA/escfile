const express=require('express')
const app=express();
const mongoose =require('mongoose')
const userRoute=require('./routes/user')
const profileRoute=require('./routes/upload')
const path=require('path')
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecfile',{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('db is connected')
})
app.use(userRoute)
app.use(profileRoute)

app.use('/upload', express.static(path.join(__dirname,'uploads')))


app.get('/',(req,res)=>{
res.send('hello ')
})

app.listen(3000,()=>{
    console.log('port is running on 3000');

})