import * as mongoose from 'mongoose';
import { model } from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    dateOfBirth: {
        type: String,
        required: false
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
    }
});

export default model('Users', userSchema);