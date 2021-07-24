import * as mongoose from 'mongoose';
import { model } from 'mongoose';
const ProductSchema = new mongoose.Schema({
    itemModelNumber: {
        type: String,
        required: false
    },
    itemName: {
        type: String,
        required: false
    },
    itemTitle: {
        type: String,
        required: false
    },
    itemBrand: {
        type: String,
        required: false
    },
    itemColor: {
        type: String,
        required: false
    },
    itemPrice: {
        type: Number,
        required: false
    },
    itemPriceOnOffer: {
        type: Number,
        required: false
    },
    itemDescription: {
        type: String,
        required: false
    },
    itemSpecifications: {
        type: String,
        required: false
    },
    itemRatting: {
        type: Number,
        required: false
    },
    itemLike: {
        type: Number,
        required: false
    },
    itemUnLike: {
        type: Number,
        required: false
    },
    itemSold: {
        type: Number,
        required: false
    },
    itemInStock: {
        type: Number,
        required: false
    },
    itemImage: {
        type: String,
        required: false
    },
    itemOccasion: {
        type: String,
        required: false
    },
    itemQuality: {
        type: Number,
        required: false
    },
    itemType: {
        type: String,
        required: false
    },
    itemPattern: {
        type: String,
        required: false
    },
});

export default model('Products', ProductSchema);