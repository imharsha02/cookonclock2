import mongoose from 'mongoose';
const connection = {};

async function dbConnect(){
    if(connection.isConnected){
         return; 
    }
    else{
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true,
        });

        connection.isConnected = db.connections[0].readyState;

        console.log("Connected to database" + connection.isConnected);
    }
}

export default dbConnect;