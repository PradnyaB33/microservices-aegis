const mongoose = require("mongoose");

const connectDatabase = () => {
    const LOCALHOST =
        process.env.LOCALHOST || "mongodb://localhost:27017/your-database-name";

    mongoose
        .connect(LOCALHOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
        })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err.message}`);
            process.exit(1);
        });
};

module.exports = connectDatabase;

