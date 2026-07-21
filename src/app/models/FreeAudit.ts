import mongoose, { Schema, Document } from 'mongoose';

export interface IFreeAudit extends Document {
  name: string;
  businessName: string;
  businessType: string;
  websiteUrl?: string;
  whatsapp: string;
  frustration: string;
  createdAt: Date;
}

const FreeAuditSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 60 },
  businessName: { type: String, required: true, maxlength: 100 },
  businessType: { type: String, required: true, maxlength: 100 },
  websiteUrl: { type: String, maxlength: 200 },
  whatsapp: { type: String, required: true, maxlength: 20 },
  frustration: { type: String, required: true, maxlength: 2000 },
}, { timestamps: true });

export default mongoose.models.FreeAudit || mongoose.model<IFreeAudit>('FreeAudit', FreeAuditSchema);
