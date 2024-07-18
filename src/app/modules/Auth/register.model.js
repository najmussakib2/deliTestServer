import { model, Schema } from "mongoose";
import { UserStatus } from "../User/user.constant.js";

const RegisterUserSchema = new Schema({
    id: {type: String,required: true,unique: true},
    Address: { type: String, required: true },
    BankAccountHolder: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
    BankAccountNo: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
    BankName: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
    BranchName: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
    City: { type: String, required: true },
    Company: { type: String, required: true },
    Email: { type: String, required: true },
    Mobile: { type: String, required: true },
    Name: { type: String, required: true },
    password: { type: String, required: true },
    PaymentMethod: { type: String, required: true },
    PaymentNumber: { type: String, required: function() { return this.PaymentMethod !== 'Bank'; } },
    PaymentType: { type: String, required: function() { return this.PaymentMethod !== 'Bank'; } },
    RoutingNo: { type: String, required: function() { return this.PaymentMethod === 'Bank'; } },
    SiteUrl: { type: String, required: true },
    needsPasswordChange: {type: Boolean,default: true},
    passwordChangedAt: { type: Date },
    role: {type: String,enum: ['superAdmin', 'merchant', 'pending', 'admin'],default: "pending"},
    status: { type: String,enum: UserStatus, default: 'in-progress'},
    isDeleted: {type: Boolean,default: false}
  },
  {
    timestamps: true,
  });

  export const RegisteredUser = model('RegisteredUser', RegisterUserSchema);