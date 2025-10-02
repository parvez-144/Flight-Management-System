const app=require('./app');
const dotenv=require('dotenv');
const connectDB=require('./src/config/db');

dotenv.config();
const PORT=process.env.PORT || 3000;

connectDB();

app.get('/',(req,res)=>{
    res.send('API is running....');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});