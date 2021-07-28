import Product from "../models/Product";
import Products from "../models/Product";

export class ProductsController {
    static async RegisterProduct(req, res, next) {
        const itemModelNumber = req.body.itemModelNumber;
        const itemName = req.body.itemName;
        const itemTitle = req.body.itemTitle;
        const itemBrand = req.body.itemBrand;
        const itemColor = req.body.itemColor;
        const itemPrice = req.body.itemPrice;
        const itemPriceOnOffer = req.body.itemPriceOnOffer;
        const itemDescription = req.body.itemDescription;
        const itemSpecifications = req.body.itemSpecifications;
        const itemRatting = req.body.itemRatting;
        const itemLike = req.body.itemLike;
        const itemUnLike = req.body.itemUnLike;
        const itemSold = req.body.itemSold;
        const itemInStock = req.body.itemInStock;
        //const itemImage = req.body.itemImage;
        const itemOccasion = req.body.itemOccasion;
        const itemQuality = req.body.itemQuality;
        const itemType = req.body.itemType;
        const itemPattern = req.body.itemPattern;
        const fileUrl = 'http://localhost:4000/' + req.file.path.replaceAll('\\', '/');

        try {
            const item = {
                itemModelNumber: itemModelNumber,
                itemName: itemName,
                itemTitle: itemTitle,
                itemBrand: itemBrand,
                itemColor: itemColor,
                itemPrice: itemPrice,
                itemPriceOnOffer: itemPriceOnOffer,
                itemDescription: itemDescription,
                itemSpecifications: itemSpecifications,
                itemRatting: itemRatting,
                itemLike: itemLike,
                itemUnLike: itemUnLike,
                itemSold: itemSold,
                itemInStock: itemInStock,
                itemImage: fileUrl,
                itemOccasion: itemOccasion,
                itemQuality: itemQuality,
                itemType: itemType,
                itemPattern: itemPattern,
            }
            let product = await new Products(item).save();
            res.send(product);
        } catch (e) {
            next(e);
        }
    }

    static async GetProducts(req, res, next) {
        try {
            const products: any = await Products.find();
            res.send(products);
        } catch (e) {
            next(e)
        }
    }
    static async GetProduct(req, res, next) {
        const product_id = req.query._id;
        try {
            const product: any = await Products.findOne({ "_id": product_id });
            res.send(product);
        } catch (e) {
            next(e)
        }
    }
}