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
            resolve({ success: false, error: error });
          });
      } catch (error) {
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

  //updating a msg
  async update(msdData:Partial<Message>):Promise<any>{
    const {id,...remaining} = msdData;
    console.log(remaining);
    
    return new Promise(async (resolve,reject) =>{
      try {
        await this.msgModel.findOneAndUpdate({id:id},remaining).then((res) =>{
          console.log("res :",res);
          
          resolve({
            success:true,
            msgId:res!.id
          })
        }).catch((error) =>{
          resolve({success:false,error:error})
        })
        
      } catch (error) {
          resolve({success:false,error:error})
      }
    })
  }
}
