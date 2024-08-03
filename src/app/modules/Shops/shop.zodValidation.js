import { z } from "zod";
import { PARCEL_CATEGORY } from "./shop.const.js";

// Define the enum values for Shop_Type and Parcel_Category
const ShopTypeEnum = z.enum(['Business use', 'Personal use']); 

// Define the shop schema
const ShopZodSchema = z.object({
    Mobile: z.string(),
    Shop_Type: ShopTypeEnum,
    Shop_Name: z.string(),
    Shop_Email: z.string().email(),
    Shop_Address: z.string(),
    Parcel_Category: PARCEL_CATEGORY,
});

export default ShopZodSchema;

/*'Books','Clothing','Crafts','Community','E-Commerce','Electronics & Gadgets','Fashon Accessories','Food','Groceries','Health & Fitnesss','Stationaries','Others','Furniture','Kids & Mom','Decor',
*/