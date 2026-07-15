import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'save-message'})
  async handleSave(@Payload() msgData: any): Promise<any> {
    console.log('hitting handleSave controller in msg-saving service', msgData);
    return await this.appService.saveMsg(msgData);
  }

  //fetching msgs
  @MessagePattern({ cmd: 'get-messages-in-range'})
  async handleFetch(@Payload() data: any): Promise<any> {
    console.log('hitting handleFetch controller in msg-saving service', data);
    return await this.appService.fetchMsg(data);
  }
}
