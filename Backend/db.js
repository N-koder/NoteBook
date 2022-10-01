const mongoose = require('mongoose');



const monogoURI = 'mongodb://localhost:27017/';
const connecttoMongo = () => {
    mongoose.connect(monogoURI, ()=>{
        console.log('connected to mongoose successfully')
    })
}

module.exports = connecttoMongo;