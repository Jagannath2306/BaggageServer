import * as mongoose from 'mongoose';
import { model } from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    address: {
        type: Array,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    histories: {
        type: Array,
        required: true
    },
    cards: {
        type: Array,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    verification_token: {
        type: Number,
        required: true
    },
    verification_token_time: {
        type: Date,
        required: true,
    }

});

export default model('Users', userSchema);