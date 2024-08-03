import {Schema, model} from 'mongoose';
import { PARCEL_CATEGORY } from './shop.const';

const shopSchema = new Schema({
    Phone: {
      type: String,
      required: true,
    },
    Shop_Type: {
      type: String,
      required: true,
      enum : ['Business use','Personal use']
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
      required: true,
      trim: true,
    },
    Parcel_Category: {
      type: String,
      required: true,
      enum: PARCEL_CATEGORY
    }
  });
  
  
  export const Shop = model('Shop', shopSchema);
