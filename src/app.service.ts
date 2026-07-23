import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileMetaDto, Message } from './schemas/msg.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Message') private msgModel: Model<Message>) {}

  private sanitizeFiles(files?: FileMetaDto[]) {
    if (!files?.length) return files;

    return files.map((file) => ({
      fileName: file.fileName,
      fileType: file.fileType,
      fileId: file.fileId,
      objectKey: file.objectKey,
    }));
  }

  private sanitizeMessage(msgData: Partial<Message>): Partial<Message> {
    return {
      ...msgData,
      files: this.sanitizeFiles(msgData.files),
    };
  }

  async saveMsg(msgData: Partial<Message>): Promise<any> {
    const payload = this.sanitizeMessage(msgData);

    return new Promise(async (resolve) => {
      try {
        await new this.msgModel({ isNew: true, ...payload })
          .save()
          .then((res) => {
            resolve({
              success: true,
              msgId: res.id,
            });
          })
          .catch((error) => {
            resolve({ success: false, error: error });
          });
      } catch (error) {
        resolve({ success: false, error: error });
      }
    });
  }

  async fetchMsg(msgData: any): Promise<any> {
    return new Promise(async (resolve) => {
      try {
        await this.msgModel
          .find({
            roomId: msgData.roomId,
            timestamp: { $lt: msgData.from, $gt: msgData.to },
          })
          .sort({ timestamp: -1 })
          .lean()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            resolve(err);
          });
      } catch (error) {
        resolve(error);
      }
    });
  }

  async update(msdData: Partial<Message>): Promise<any> {
    const { id, ...remaining } = msdData;
    const payload = this.sanitizeMessage(remaining);

    return new Promise(async (resolve) => {
      try {
        await this.msgModel
          .findOneAndUpdate({ id: id }, payload)
          .then((res) => {
            resolve({
              success: true,
              msgId: res!.id,
            });
          })
          .catch((error) => {
            resolve({ success: false, error: error });
          });
      } catch (error) {
        resolve({ success: false, error: error });
      }
    });
  }
}
