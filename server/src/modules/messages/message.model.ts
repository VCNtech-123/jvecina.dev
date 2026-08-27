import { Schema, model } from "mongoose";

export interface IMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  readAt?: Date | null;     
  ip?: string;
  userAgent?: string;
}

const messageSchema = new Schema<IMessage>(
  {
    name: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 80 
    },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true, 
        maxlength: 120 
    },
    subject: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 120 
    },
    message: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 2000 
    },
    readAt: { 
        type: Date, 
        default: null 
    },
    ip: { 
        type: String, 
        default: "" 
    },
    userAgent: { 
        type: String, 
        default: "" 
    },
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });
messageSchema.index({ readAt: 1 });

const baseTransform = (_doc: any, ret: any) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

messageSchema.set("toJSON", { versionKey: false, transform: baseTransform });
messageSchema.set("toObject", { versionKey: false, transform: baseTransform });

export const Message = model<IMessage>("Message", messageSchema);