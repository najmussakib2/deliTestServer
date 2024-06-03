import { z } from 'zod';

// Define the Zod schema
const parcelZodSchema = z.object({
  email: z.string().email(),
  // sender_name: z.string(),
  sender_phone: z.string(),
  recipient_name: z.string(),
  recipient_phone: z.string(),
  // parcel_type: z.string(),
  parcel_weight_amount: z.number(),
  // delivery_type: z.string(),
  delivery_area_amount: z.number(),
  // product_price: z.number(),
  collection_amount: z.number(),
  shop_name: z.string(),
  recipient_address: z.string(),
  instructions: z.string().optional(),
  delivery_charge: z.number(),
  COD_charge: z.number(),
  total_amount: z.number(),
  discount: z.number(),
  total_payable: z.number(),
  status: z.string(),
  payment_status: z.string()
});

export { parcelZodSchema };
