import mongoose from 'mongoose';

const uri: string = process.env.MONGO_URI as string;

const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('MongoDB connected!');
  }
};

export default connectMongo;
