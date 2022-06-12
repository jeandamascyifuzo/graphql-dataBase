const mongoose = require('mongoose');
const Client = require('./Client');

const projectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Client
    },
}); 

module.exports = mongoose.model('Project', projectSchema)
