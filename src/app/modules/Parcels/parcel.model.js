import { Schema, model } from "mongoose";
const parcelSchema = new Schema({
    Mobile: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true
    },
    customer_phone: {
      type: String,
      required: true
    },
    parcel_weight_amount: {
      type: Number,
      required: true
    },
    delivery_area_amount: {
      type: Number,
      required: true
    },
    collection_amount: {
      type: Number,
      required: true
    },
    shop_name: {
      type: String,
      required: true
    },
    shop: {
      type: Schema.Types.ObjectId,
      required: [true, 'Shop id is required'],
      unique: true,
      ref: 'Shop',
    },
    customer_address: {
      type: String,
      required: true
    },
    instructions: {
      type: String
    },
    delivery_charge: {
      type: Number,
      required: true
    },
    COD_charge: {
      type: Number,
      required: true
    },
    total_amount: {
      type: Number,
      required: true
    },
    total_payable: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum : ['pending',"processing","delivered"],
      required: true,
      default: "pending" 
    },
    payment_status: {
      type: String,
      enum : ['paid','unpaid'],
      required: true,
      default: "unpaid"
    }
  },
  {
    timestamps: true,
  },
);
  
export const Parcel = model('Parcel', parcelSchema);
