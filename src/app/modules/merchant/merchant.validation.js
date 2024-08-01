import { z } from 'zod';

// Company Schema
const companySchema = z.object({
  companyName: z.string(),
  siteUrl: z.string().url().optional(),
  city: z.string(),
  zone: z.string().optional()
});

// Payment Schema
const bkashSchema = z.object({
  bkashType: z.enum(['agent', 'personal']),
  bkashNumber: z.string()
});

const bankSchema = z.object({
  bankName: z.enum(['brac', 'dbbl', 'other']),
  accountHolder: z.string(),
  accountNumber: z.string(),
  branchName: z.string().optional(),
  routingNumber: z.string().optional()
});

const paymentSchema = z.object({
  bkash: bkashSchema.optional(),
  bank: bankSchema.optional()
}).refine(data => data.bkash || data.bank, {
  message: "Either bkash or bank information is required"
});

export const createMerchantValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    merchant: z.object({
      company: companySchema,
      payment: paymentSchema,
      name: z.string(),
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email(),
      Mobile: z.string(),
      emergencyContactNo: z.string(),
      address: z.string(),
      profileImg: z.string().url().optional(),
      isDeleted: z.boolean().optional()
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updatemerchantValidationSchema = z.object({
  body: z.object({
    merchant: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
    }),
  }),
});

export const merchantValidations = {
  createMerchantValidationSchema,
  updatemerchantValidationSchema,
};
