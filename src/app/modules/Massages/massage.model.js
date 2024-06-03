import { Schema, model } from "mongoose";

const paymentRequestSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  });
  
  export const massage = model('massage', paymentRequestSchema);