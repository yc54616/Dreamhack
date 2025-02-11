import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Flag, FlagDocument, UserDocument } from 'src/common/schemas';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Flag.name)
    private flagModel: Model<FlagDocument>,
  ) {}

  async getAllFlag(): Promise<FlagDocument[]> {
    const flags = await this.flagModel.find();

    return flags;
  }

  async addFlag(user: UserDocument): Promise<FlagDocument> {
    const existingFlag = await this.flagModel.findOne({ user: new Types.ObjectId(user._id) });
    
    if (existingFlag) throw new HttpException('This Account already have flag.', 403);

    const flag = new this.flagModel({
      name: "Taegeukgi",
      user: new Types.ObjectId(user._id),
    });

    await flag.save();
    return flag;
  }

  async removeFlag(user: UserDocument): Promise<boolean> {
    const existingFlag = await this.flagModel.deleteMany({ user: new Types.ObjectId(user._id) });
    return true;
  }

  async getFlag(user: UserDocument): Promise<string> {
    const existingFlag = await this.flagModel.find({ user: new Types.ObjectId(user._id) });
    console.log(existingFlag)
    if (existingFlag.length > 2) return process.env.FLAG;
    else throw new HttpException('You don\'t have enough flags.', 404);
  }
}
