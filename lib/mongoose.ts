import mongoose from 'mongoose';

// DB Connection ready state
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
// 99 = uninitialized


let DBConnectionState:mongoose.ConnectionStates = 0

export const connectToDB = async () => {
    if (DBConnectionState === 1) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }
    
    console.log('=> using new database connection');
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        DBConnectionState = db.connections[0].readyState;
    } catch (error) {
        console.log('error connecting to db:', error);
        DBConnectionState = 99
    }
}