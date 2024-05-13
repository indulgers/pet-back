import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({ type: String, description: '主键 id' })
  @PrimaryColumn({
    type: 'bigint',
    comment: '主键 id',
    nullable: false,
  })
  public id: string;

  @ApiProperty({ type: Number, description: '状态, 0: 删除，1: 正常' })
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态, 0: 删除，1: 正常',
    nullable: false,
  })
  public status: number;

  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({
    comment: '创建时间',
    name: 'create_time',
  })
  public createTime: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({
    comment: '更新时间',
    name: 'update_time',
  })
  public updateTime: Date;
}
