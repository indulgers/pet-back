import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('script_type')
export class ScriptType {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ type: Number, description: 'type_id' })
  @Column({
    type: 'int',
    comment: 'type_id',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为 0
  })
  public type_id: number;

  @ApiProperty({ type: String, description: 'type_name' })
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'type_name',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public type_name: string;

  @ApiProperty({ type: Number, description: 'status' })
  @Column({
    type: 'int',
    default: 0,
    comment: 'status',
    nullable: false, // 设置为非 NULL
  })
  public status: number;

  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({
    comment: '创建时间',
  })
  public create_time: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({
    comment: '更新时间',
  })
  public update_time: Date;
}
