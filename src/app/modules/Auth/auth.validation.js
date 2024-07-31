import { z } from 'zod';

const UserStatus = z.enum(['in-progress', 'blocked']);

const RegisterValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  Address: z.string().min(1, "Address is required"),
  BankAccountHolder: z.string().optional(),
  BankAccountNo: z.string().optional(),
  BankName: z.string().optional(),
  BranchName: z.string().optional(),
  City: z.string().min(1, "City is required"),
  Company: z.string().min(1, "Company is required"),
  Email: z.string().email("Invalid email address"),
  Mobile: z.string().min(1, "Mobile is required"),
  Name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
  PaymentMethod: z.string().min(1, "PaymentMethod is required"),
  PaymentNumber: z.string().optional(),
  PaymentType: z.string().optional(),
  RoutingNo: z.string().optional(),
  SiteUrl: z.string().url("Invalid URL"),
  needsPasswordChange: z.boolean().default(true),
  passwordChangedAt: z.date().optional(),
  role: z.enum(['superAdmin', 'merchant', 'pending', 'admin']).default("pending"),
  status: UserStatus.default('in-progress'),
  isDeleted: z.boolean().default(false),
}).refine(data => {
  if (data.PaymentMethod === 'Bank') {
    return data.BankAccountHolder && data.BankAccountNo && data.BankName && data.BranchName && data.RoutingNo;
  }
  return data.PaymentMethod !== 'Bank' ? (data.PaymentNumber && data.PaymentType) : true;
}, {
  message: "Invalid payment details",
});

const loginValidationSchema = z.object({
  body: z.object({
    // email: z.string({ required_error: 'email is required.' }),
    Mobile: z.string().min(11, { message: "minimum 11 numbers required." }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});

export const AuthValidation = {
  RegisterValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
