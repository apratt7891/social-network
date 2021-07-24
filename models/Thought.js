const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)  
        }    
    }
)













const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
           
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          },
        username: {
            type: String,
            required: true
        },
        reactions
    }
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, reactions) => total + reactions.length + 1,0);
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;