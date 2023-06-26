const mongoose = require('mongoose');

require('dotenv').config();

const ServerApiVersion  = require('mongoose');

async function connect() {
    try {
        // const url = 'mongodb://localhost:27017/lvtn_qrcode';
        
        const url = 'mongodb+srv://ngocminh101100:hucP6zsRir059b14@cluster0.7kdyflp.mongodb.net/?retryWrites=true&w=majority'
        mongoose.set("strictQuery", false);
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
