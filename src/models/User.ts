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
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    address: {
        type: Array,
        required: false
    },
    histories: {
        type: Array,
        required: false
    },
    cart: {
        type: Array,
        required: false
    },
    cards: {
        type: Array,
        required: false
    },
    profilePhoto: {
        type: String,
        required: false
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
    },
    reset_password_token: {
        type: Number,
        required: false
    },
    reset_password_token_time: {
        type: Date,
        required: false
    }
});

export default model('Users', userSchema);