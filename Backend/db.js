const mongoose = require('mongoose');
// const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true";
const mongoURI = "mongodb://127.0.0.1:27017/ebook?directConnection=true";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

module.exports = connectToMongo;
