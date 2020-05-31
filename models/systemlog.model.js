const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const systemlogSchema = new Schema({
    clientid:{type:String},
    process:{type:String},
    datetimes:{type:String},
    dates:{type:String},
    times:{type:String},
    logs:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const SystemLog = mongoose.model('SystemLog', systemlogSchema);

    module.exports = SystemLog;