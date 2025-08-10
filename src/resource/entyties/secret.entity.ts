import { Entity,Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entyti';
import { Base } from './base.entyti';

@Entity()
export class SecretCode extends Base{
  @Column()
  code: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({default:false})
  isVerify:boolean
}