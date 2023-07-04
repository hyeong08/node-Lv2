const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://id:pw@cluster0.3tc0dmy.mongodb.net/sign?retryWrites=true")
const connect = async () => {mongoose.connect(process.env.MONGODB_URI)};
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db connected!'));

module.exports = connect;
