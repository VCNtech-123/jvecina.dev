import { Schema, model } from "mongoose";

export interface IProject {
    title: string;
    slug: string;
    summary: string;
    description?: string;
    highlights?: string[];
    techStack?: string[];
    githubUrl?: string;
    liveUrl?: string;
    images?: string[];
    featured?: boolean;
    order?: number;
}

const projectSchema = new Schema<IProject>(
  {
    title: { 
            type: String, 
            required: true, 
            trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    summary: { 
        type: String, 
        required: true, 
        trim: true 
    },          
    description: { 
        type: String, 
        default: "" 
    },                     
    highlights: { 
        type: [String], 
        default: [] 
    },                      
    techStack: { 
        type: [String], default: [] 
    },                      
    githubUrl: { 
        type: String, 
        default: "" 
    },
    liveUrl: { 
        type: String, 
        default: "" 
    },
    images: { 
        type: [String], 
        default: [] 
    },                         
    featured: { 
        type: Boolean, 
        default: false 
    },
    order: { 
        type: Number, 
        default: 0 
    }                               
  },
  { timestamps: true }
);

projectSchema.index({ featured: 1, order: 1, createdAt: -1 });

export const Project = model("Project", projectSchema);