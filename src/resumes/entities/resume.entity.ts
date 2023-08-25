import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Resume {
  id: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User })
  userId: string;

  @Prop([String])
  experiences: string[];
}
