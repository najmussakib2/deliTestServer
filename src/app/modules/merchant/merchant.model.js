import { Schema, model } from 'mongoose';

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  siteUrl: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zone: {
    type: String
  }
},{ _id : false });

const paymentSchema = new Schema({
  bkash: {
    type: {
      bkashType: {
        type: String,
        enum: ['agent', 'personal'],
        required: true
      },
      bkashNumber: {
        type: String,
        required: true
      }
    }
  },
  bank: {
    type: {
      bankName: {
        type: String,
        enum: ['brac', 'dbbl', 'other'],
        required: true
      },
      accountHolder: {
        type: String,
        required: true
      },
      accountNumber: {
        type: String,
        required: true
      },
      branchName: {
        type: String
      },
      routingNumber: {
        type: String
      }
    }
  }
},{ _id : false });


const merchantSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    company: {
      type: companySchema,
      required: [true, 'Company details is required'],
    },
    payment: {
      type: paymentSchema,
      required: [true, 'Payment details is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    Mobile: { 
      type: String, 
      required: [true, 'Contact number is required'] 
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    address: {
      type: String,
      required: [true, 'Present address is required'],
    },
    profileImg: { type: String, default: '' },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  }
);

// Query Middleware
merchantSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

merchantSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

merchantSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
merchantSchema.statics.isUserExists = async function (id) {
  const existingUser = await merchant.findOne({ id });
  return existingUser;
};

export const merchant = model('merchant', merchantSchema);


//------------------------------------------------------------------------------

