const mongoose = require('mongoose');
const User = require('../api/model/user');

const connect = async () => {
    console.log('Connecting...');
    await mongoose.connect('mongodb://localhost:27017/users');
}

const findUser = async (email) => {
    return await User.findOne({ 'email': email }).exec();
}

const saveUser = async (user) => {
    return await user.save();
}

const disconnect = async () => {
    console.log('Disconnecting...');
    await mongoose.connection.close();
}

module.exports = { connect, findUser, saveUser, disconnect }