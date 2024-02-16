const express=require('express')
const app=express()
require('dotenv').config()

//routers (can be grouped in one file )
homeRouter=require('./routes/home')
authRouter=require('./routes/auth')
offersRouter=require('./routes/offers')
profileRouter=require('./routes/profile')


const connectDB=require('./db/connect')

app.use(express.json())


app.use('/api/auth/',authRouter)
app.use('/api/home/',homeRouter)
app.use('/api/offers/',offersRouter)
app.use('/api/profile/',profileRouter)



const port=3000



start =async ()=>{
    try{
        await connectDB(process.env.CONNECTION_STRING)
        app.listen(port,()=>{console.log("start listening")})
    }
    catch(error){
        console.log(error)
    }
   
}

start()