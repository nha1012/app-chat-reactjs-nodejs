let connectDatabase = (mongoose)=>{
    mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true , useFindAndModify:false})
        .then(()=>{
            console.log("connect to mongoDB "+ process.env.DATABASE_URL);
        })
        .catch((err)=>{
            console.log(err);
            
        })
}
module.exports = connectDatabase

