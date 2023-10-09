import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles_lora')
export class RolesLora {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryColumn({
    type: 'int',
    comment: 'id',
  })
  public id: number;

  @ApiProperty({ type: String, description: 'Lora ID' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: 'Lora ID',
  })
  public lora_id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '角色id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '角色id',
  })
  public role_id: string;

  @ApiProperty({ type: String, description: 'Lora模型信息' })
  @Column({
    type: 'text',
    comment: 'Lora模型信息',
  })
  public lora_model_info: string;

  @ApiProperty({ type: String, description: 'Lora模型链接' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Lora模型链接',
  })
  public lora_model_url: string;

  @ApiProperty({ type: String, description: '配置链接' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '配置链接',
  })
  public config_url: string;

  @ApiProperty({ type: String, description: '角色视图图像链接' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '5 views of role',
  })
  public views_img_url: string;

  @ApiProperty({ type: String, description: '训练图像链接' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '训练图像链接',
  })
  public train_img_url: string;

  @ApiProperty({ type: String, description: '演示链接' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '演示链接',
  })
  public demo_url: string;

  @ApiProperty({ type: String, description: '额外信息' })
  @Column({
    type: 'longtext',
    comment: '额外信息',
  })
  public extra: string;

  @ApiProperty({ type: Number, description: '状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '状态',
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
