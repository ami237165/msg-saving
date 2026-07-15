import { Schema, Document } from 'mongoose';

export const FileMetaSchema = new Schema({
  filename: { type: String },
  fileType: { type: String },
  fileId: { type: String },
  previewUrl: { type: String },
  fileData: { type: Schema.Types.Mixed },
});

export class FileMetaDto {
  filename: string;
  fileType: string;
  fileId: string;
  previewUrl: string;
  fileData: any;
}

export interface Message extends Document {
  text?: string;
  files?: FileMetaDto[];
  hasText: boolean;
  hasFiles: boolean;
  sender: string;
  receiver: string;
  id: string;
  timestamp: string;
  roomId: string;
  isUploading?: boolean;
  isRead?: boolean;
  isSent?: boolean;
  delivered?: boolean;
}

export const MessageSchema = new Schema({
  text: String,
  files: [FileMetaSchema], // <-- FIXED: Array of embedded subdocuments
  hasText: Boolean,
  hasFiles: Boolean,
  sender: String,
  receiver: String,
  id: String,
  timestamp: String,
  roomId: String,
  isUploading: Boolean,
  isRead: Boolean,
  isSent: Boolean,
});
