import { Schema, model } from "mongoose";
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

const adminTransform = (_doc: any, ret: any) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.passwordHash;
  return ret;
};

adminSchema.set("toJSON", { versionKey: false, transform: adminTransform });
adminSchema.set("toObject", { versionKey: false, transform: adminTransform });

export const Admin = model<IAdmin>('Admin', adminSchema)

