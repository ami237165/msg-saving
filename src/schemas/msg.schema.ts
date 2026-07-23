import { Schema, Document } from 'mongoose';

export const FileMetaSchema = new Schema({
  fileName: { type: String },
  fileType: { type: String },
  fileId: { type: String },
  objectKey: { type: String },
});

export class FileMetaDto {
  fileName: string;
  fileType: string;
  fileId: string;
  objectKey?: string;
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
  files: [FileMetaSchema],
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
  delivered: Boolean,
});
