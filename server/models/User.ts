import {Schema, Model, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  emailConfirmed: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  isCorrectPassword: (password: string) => Promise<boolean>;
}

export const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: Number,
    required: true,
    trim: true,
    match: [/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Must be a valid US Zip Code!'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  emailConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  }
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User
