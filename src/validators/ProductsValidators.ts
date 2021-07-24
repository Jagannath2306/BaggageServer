import { body, header } from 'express-validator';
import { query } from 'express-validator';
import Products from '../models/Product'

export class ProductsValidater {
    static RegisterProduct() {
        return [
            body("ItemModelNumber", "Item Model Number is Required"),
            body("itemName", "Item Name is Required"),
            body("itemTitle", "Ttem Title is Required"),
            body("itemBrand", "Item Brand is Required"),
            body("itemColor", "Item Color is Required"),
            body("itemColor", "Item Color is Required"),
            body("itemPrice", "Item Price is Required"),
            body("itemPriceOnOffer", "Item Price On Offer is Required"),
            body("itemDescription", "Item Description is Required"),
            body("itemSpecifications", "Item Specifications is Required"),
            body("itemRatting", "Item Ratting is Required"),
            body("itemLike", "Item Like is Required"),
            body("itemUnLike", "Item UnLike is Required"),
            body("itemSold", "Item Sold is Required"),
            body("itemInStock", "Item InStock is Required"),
            body("itemImage", "Item Image is Required"),
            body("itemOccasion", "Item Occasion is Required"),
            body("itemQuality", "Item Quality is Required"),
            body("itemType", "Item Type is Required"),
            body("itemPattern", "Item Pattern is Required")
        ]
    }
}