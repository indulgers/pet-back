import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: '用户登录密码',
  })
  public password: string;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column({
    type: 'varchar',
    length: 200,
    comment: '盐',
    nullable: false,
  })
  public salt: string;

  @ApiProperty({ type: String, description: '用户登录名' })
  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @ApiProperty({ type: String, description: '邮箱' })
  @Column({
    length: 50,
    comment: '邮箱',
  })
  email: string;

  @ApiProperty({ type: String, description: '手机号' })
  @Column({
    length: 50,
    comment: '手机号',
  })
  phone: string;

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
