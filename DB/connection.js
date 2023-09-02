import mongoose from "mongoose"

const connectDB = async () => {
    return await mongoose.connect(process.env.LOCAL_DB).then(result => {
        console.log('db connection success');
    }).catch(err => {
        console.log(`error connection ${err}`);
    })
}

export default connectDB;