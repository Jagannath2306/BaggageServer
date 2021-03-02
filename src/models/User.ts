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
        required: false
    },
    cart: {
        type: Array,
        required: false
    },
    histories: {
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
        type: String,
        required: false,
        default: new Date()
    },
    updated_at: {
        type: String,
        required: false,
        default: new Date()
    }

});

export default model('Users', userSchema);