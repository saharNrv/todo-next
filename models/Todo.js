const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true

})

const todoModel = mongoose.models.Todo || mongoose.model('todo', todoSchema)