import mongoose from 'mongoose';

let mgConnectionState:mongoose.ConnectionStates = 0

export const connectToDB = async () => {
    if (mgConnectionState === 1) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }
    
    console.log('=> using new database connection');
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mgConnectionState = db.connections[0].readyState;
}