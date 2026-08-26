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

export const Message = model<IMessage>("Message", messageSchema);