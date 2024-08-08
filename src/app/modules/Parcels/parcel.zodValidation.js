import { z } from 'zod';

// Define the Zod schema
const parcelZodSchema = z.object({
  Mobile: z.string().nonempty("Mobile number is required"),
  customer_name: z.string().nonempty("Customer name is required"),
  customer_phone: z.string().nonempty("Customer phone is required"),
  parcel_weight_amount: z.number().nonnegative("Parcel weight amount must be a positive number"),
  delivery_area_amount: z.number().nonnegative("Delivery area amount must be a positive number"),
  collection_amount: z.number().nonnegative("Collection amount must be a positive number"),
  shop_name: z.string().nonempty("Shop name is required"),
  customer_address: z.string().nonempty("Customer address is required"),
  instructions: z.string().optional(),
  delivery_charge: z.number().nonnegative("Delivery charge must be a positive number"),
  COD_charge: z.number().nonnegative("COD charge must be a positive number"),
  total_amount: z.number().nonnegative("Total amount must be a positive number"),
  discount: z.number().nonnegative("Discount must be a positive number"),
  total_payable: z.number().nonnegative("Total payable must be a positive number"),
  status: z.enum(["pending", "approved"]),
  payment_status: z.enum(["paid", "unpaid"]),
});

export { parcelZodSchema };
