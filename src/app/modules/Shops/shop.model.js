import {Schema, model} from 'mongoose';

const shopSchema = new Schema({
    Merchant_Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    Shop_Type: {
      type: String,
      required: true
    },
    Shop_Name: {
      type: String,
      required: true
    },
    Shop_Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    Shop_Address: {
      type: String,
      required: true
    },
    Parcel_Category: {
      type: String,
      required: true
    }
  });
  
  
  export const Shop = model('Shop', shopSchema);