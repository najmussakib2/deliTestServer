/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config/index.js';
import { UserStatus } from './user.constant.js';

// const UserSchema = new Schema({
//   id: {type: String,required: true,unique: true},
//   Address: { type: String, required: true },
//   BankAccountHolder: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
//   BankAccountNo: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
//   BankName: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
//   BranchName: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
//   City: { type: String, required: true },
//   Company: { type: String, required: true },
//   Email: { type: String, required: true },
//   Mobile: { type: String, required: true },
//   Name: { type: String, required: true },
//   password: { type: String, required: true },
//   PaymentMethod: { type: String, required: true },
//   PaymentNumber: { type: String, required: function() { return this.PaymentMethod !== 'Bank'; } },
//   PaymentType: { type: String, required: function() { return this.PaymentMethod !== 'Bank'; } },
//   RoutingNo: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
//   SiteUrl: { type: String, required: true },
//   needsPasswordChange: {type: Boolean,default: true},
//   passwordChangedAt: { type: Date },
//   role: {type: String,enum: ['superAdmin', 'merchant', 'pending', 'admin'],default: "pending"},
//   status: { type: String,enum: UserStatus, default: 'in-progress'},
//   isDeleted: {type: Boolean,default: false}
// },
// {
//   timestamps: true,
// });
// Custom validation function to handle conditional fields
// UserSchema.path('PaymentMethod').validate(function(value) {
//   if (value === 'Bank') {
//     return this.BankAccountHolder && this.BankAccountNo && this.BankName && this.BranchName && this.RoutingNo;
//   } else if (value === 'Bkash' || value === 'Nagad') {
//     return this.PaymentNumber && this.PaymentType;
//   }
//   return true;
// }, 'Missing required fields based on PaymentMethod');
const UserSchema = new Schema(  {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // select: 0,
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['superAdmin', 'merchant',  'admin'],
  },
  status: {
    type: String,
    enum: UserStatus,
    default: 'in-progress',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});



UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (id) {
  return await User.findOne({ id }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model('User', UserSchema);
