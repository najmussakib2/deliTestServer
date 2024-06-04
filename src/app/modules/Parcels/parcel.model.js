import { Schema, model } from "mongoose";
const parcelSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    // sender_name: {
    //   type: String,
    //   required: true
    // },
    sender_phone: {
      type: String,
      required: true
    },
    recipient_name: {
      type: String,
      required: true
    },
    recipient_phone: {
      type: String,
      required: true
    },
    // parcel_type: {
    //   type: String,
    //   required: true
    // },
    parcel_weight_amount: {
      type: Number,
      required: true
    },
    // delivery_type: {
    //   type: String,
    //   required: true
    // },
    delivery_area_amount: {
      type: Number,
      required: true
    },
    // product_price: {
    //   type: Number,
    //   required: true
    // },
    collection_amount: {
      type: Number,
      required: true
    },
    shop_name: {
      type: String,
      required: true
    },
    recipient_address: {
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
    discount: {
      type: Number,
      required: true
    },
    total_payable: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum : ['pending','approved'],
      required: true
    },
    payment_status: {
      type: String,
      enum : ['paid','unpaid'],
      required: true
    }
  },
  {
    timestamps: true,
  },
);
  
export const Parcel = model('Parcel', parcelSchema);