import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL || '';

export const connectDB = async (): Promise<void> => {
  try {
    // Connect to the in-memory database
    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to MongoDB');
    
    // Handle connection events
    mongoose.connection.on('error', (e) => {
      console.error('MongoDB connection error:', e);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error while closing MongoDB connection', error);
  }
};