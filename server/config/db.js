import mongoose from "mongoose";

//Function to connect to the MongoDB database
const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/CareerQuest', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
      } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
      }
}

export default connectDB