const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const TaskSchema = new Schema
(
    {
        text: {
            type:       String,
            default:    '',
            trim:       true,
        },
        date: {
            type:       Date,
            default:    '',
            trim:       true,
        },
        owner: {
            type:       String,
            default:    '',
            trim:       true,
        }
    },
    {
        collection:     'tasks'
    }
)

module.exports = mongoose.model("Task", TaskSchema);