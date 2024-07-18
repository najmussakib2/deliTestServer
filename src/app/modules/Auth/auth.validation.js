import { z } from 'zod';

const UserStatus = ['in-progress', 'blocked']; 

const RegisterValidationSchema = z.object({
  id: z.string().nonempty(),
  Address: z.string().nonempty(),
  BankAccountHolder: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod === 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'BankAccountHolder is required if PaymentMethod is Bank',
  }),
  BankAccountNo: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod === 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'BankAccountNo is required if PaymentMethod is Bank',
  }),
  BankName: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod === 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'BankName is required if PaymentMethod is Bank',
  }),
  BranchName: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod === 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'BranchName is required if PaymentMethod is Bank',
  }),
  City: z.string().nonempty(),
  Company: z.string().nonempty(),
  Email: z.string().nonempty(),
  Mobile: z.string().nonempty(),
  Name: z.string().nonempty(),
  Password: z.string().nonempty(),
  PaymentMethod: z.string().nonempty(),
  PaymentNumber: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod !== 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'PaymentNumber is required if PaymentMethod is not Bank',
  }),
  PaymentType: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod !== 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'PaymentType is required if PaymentMethod is not Bank',
  }),
  RoutingNo: z.string().optional().refine((val, ctx) => {
    if (ctx.parent.PaymentMethod === 'Bank' && !val) {
      return false;
    }
    return true;
  }, {
    message: 'RoutingNo is required if PaymentMethod is Bank',
  }),
  SiteUrl: z.string().nonempty(),
  needsPasswordChange: z.boolean().default(true),
  passwordChangedAt: z.date().optional(),
  role: z.enum(['superAdmin', 'merchant', 'pending', 'admin']).default('pending'),
  status: z.enum(UserStatus).default('in-progress'),
  isDeleted: z.boolean().default(false),
});

const loginValidationSchema = z.object({
  body: z.object({
    // email: z.string({ required_error: 'email is required.' }),
    email: z.string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
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
