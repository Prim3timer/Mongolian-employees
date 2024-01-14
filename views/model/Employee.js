let mongoose = require('mongoose')
const {Schema} = mongoose
const employeeSchema = new Schema({
    name: {
        type: String,
        reqiured: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    sex: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)
