import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/msg.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Message') private msgModel: Model<Message>) {}
  getHello(): string {
    console.log('hitting service');

    return 'Hello World!';
  }
  async saveMsg(msgData: Partial<Message>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log('hitting service');

      try {
        await new this.msgModel({ isNew: true, ...msgData })
          .save()
          .then((res) => {
            resolve({
              success: true,
              msgId: res.id,
            });
          })
          .catch((error) => {
            console.log('error :', error);

            resolve({ success: false, error: error });
          });
      } catch (error) {
        console.log('error1 :', error);
        resolve({ success: false, error: error });
      }
    });
  }

  async fetchMsg(msgData: any): Promise<any> {
    console.log('hitting fetchMsg service', msgData);

    return new Promise(async (resolve, reject) => {
      try {
        await this.msgModel
          .find({
            roomId: msgData.roomId,
            timestamp: { $lt: msgData.from, $gt: msgData.to },
          })
          .sort({ timestamp: -1 })
          .lean()
          .then((res) => {
            console.log('results from fetchMsg service', res);

            resolve(res);
          })
          .catch((err) => {
            console.log('error from fetchMsg service', err);
            resolve(err);
          });
      } catch (error) {
        console.log('exception in fetchMsg service', error);

        resolve(error);
      }
    });
  }
}
