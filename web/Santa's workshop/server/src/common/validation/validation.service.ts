import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationService {
  async validateData(dtoClass: any, data: any): Promise<any> {
    console.log(data);
    try {
      const target = plainToClass(dtoClass, data);
      console.log("target", target)
      const errors = await validate(target);
      if (errors.length > 0) {
        return false;
      }
      return target;
    } catch (error) {
      // error occured
      return false;
    }
  }
}