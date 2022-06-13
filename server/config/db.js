const mongoose = require('mongoose');

const connectDB = async ()=>{
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(`dataBase connected!!!: ${connect.connection.host}`.green.bold);
}

module.exports = connectDB;