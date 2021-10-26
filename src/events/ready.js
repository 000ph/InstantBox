const mongoose = require('mongoose')
module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    await mongoose.connect(process.env.MONGOURI)
}