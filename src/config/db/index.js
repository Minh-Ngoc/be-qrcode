const mongoose = require('mongoose');
const ServerApiVersion  = require('mongoose');

async function connect() {
    try {
        const url = 'mongodb://localhost:27017/lvtn_qrcode';
        // const url = 'mongodb+srv://ngocminh101100:Minh1805701@cluster0.7kdyflp.mongodb.net/?retryWrites=true&w=majority'
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
