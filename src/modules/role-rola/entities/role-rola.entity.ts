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
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ type: String, description: 'Lora ID' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: 'Lora ID',
    nullable: false, // 设置为非 NULL
  })
  public lora_id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
    nullable: false, // 设置为非 NULL
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '角色id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '角色id',
    nullable: false, // 设置为非 NULL
  })
  public role_id: string;

  @ApiProperty({ type: String, description: 'Lora模型信息' })
  @Column({
    type: 'text',
    comment: 'Lora模型信息',
    nullable: true,
  })
  public lora_model_info: string;

  @ApiProperty({ type: String, description: 'Lora模型地址' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Lora模型地址',
    nullable: true,
  })
  public lora_model_url: string;

  @ApiProperty({ type: String, description: '配置地址' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '配置地址',
    nullable: true,
  })
  public config_url: string;

  @ApiProperty({ type: String, description: '角色视图图像地址' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '5 views of role',
    nullable: true,
  })
  public views_img_url: string;

  @ApiProperty({ type: String, description: '训练图像地址' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '训练图像地址',
    nullable: true,
  })
  public train_img_url: string;

  @ApiProperty({ type: String, description: '演示地址' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '演示地址',
    nullable: true,
  })
  public demo_url: string;

  @ApiProperty({ type: String, description: '额外信息' })
  @Column({
    type: 'longtext',
    comment: '额外信息',
    nullable: true,
  })
  public extra: string;

  @ApiProperty({ type: Number, description: '状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '状态',
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
