import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';


export interface IAdmin {
    name: string,
    email: string,
    password: string
    comparePassword(enteredPassword: string): Promise<boolean> 
}

const adminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            select: false,
            },
    }
)

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

