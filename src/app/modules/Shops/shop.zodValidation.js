import { z } from "zod";

// Define the enum values for Shop_Type and Parcel_Category
const ShopTypeEnum = z.enum(['Business use', 'Personal use']); 
const ParcelCategoryEnum = z.enum(['Books','Clothing','Crafts','Community','E-Commerce','Electronics & Gadgets','Fashon Accessories','Food','Groceries','Health & Fitnesss','Stationaries','Others','Furniture','Kids & Mom','Decor']); // 

// Define the shop schema
const ShopZodSchema = z.object({
    Merchant_Email: z.string().email(),
    Shop_Type: ShopTypeEnum,
    Shop_Name: z.string(),
    Shop_Email: z.string().email(),
    Shop_Address: z.string(),
    Parcel_Category: ParcelCategoryEnum,
});

export default ShopZodSchema;

/*'Books','Clothing','Crafts','Community','E-Commerce','Electronics & Gadgets','Fashon Accessories','Food','Groceries','Health & Fitnesss','Stationaries','Others','Furniture','Kids & Mom','Decor',
*/