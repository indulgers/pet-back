import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  public id: string;

  @ApiProperty({ type: String, description: '用户登录名' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户昵称',
    default: '',
  })
  nickname: string;

  @ApiProperty({ type: String, description: '手机号' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '手机号',
    default: '0',
  })
  mobile: string;

  @ApiProperty({ type: String, description: '用户密码' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户密码',
    default: '',
  })
  password: string;

  @ApiProperty({ type: Number, description: '角色' })
  @Column({
    type: 'int',
    comment: '角色',
    default: () => 0,
  })
  role: number;

  @ApiProperty({ type: Number, description: '用户状态' })
  @Column({
    type: 'int',
    comment: '用户状态',
    default: () => 0,
  })
  status: number;

  @ApiProperty({ type: String, description: '头像' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '头像',
    default: '',
  })
  avatar: string; 

  @ApiProperty({ type: String, description: '邮箱' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '邮箱',
    default: '',
  })
  email: string;

  @ApiProperty({ type: String, description: '性别' })
  @Column({
    type: 'int',
    comment: '性别',
    default:0,
  })
  gender: number;

  @ApiProperty({ type: String, description: '名字' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '名字',
    default: '',
  })
  name: string;

  @ApiProperty({ type: String, description: '生日' })
  @Column({
    type: 'date',
    comment: '生日',
    default: '1970-01-01',
  })
  birthday: Date;

  @ApiProperty({ type: String, description: '城市' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '城市',
    default: '',
  })
  city: string;

  @ApiProperty({ type: String, description: '签名' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '签名',
    default: '',
  })
  signature: string;


  @ApiProperty({ type: String, description: '' })
  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
