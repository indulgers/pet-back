import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn, PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles_views')
export class RolesViews {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  public id: number;

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

  @ApiProperty({ type: String, description: '训练后的Lora ID' })
  @Column({
    type: 'text',
    comment: '训练后的Lora ID: {"pro_id":"lora_id"}',
    nullable: true,
  })
  public lora_ids: string;

  @ApiProperty({ type: String, description: '角色视图图像地址' })
  @Column({
    type: 'text',
    comment: '5 views of role',
    nullable: true,
  })
  public views_img_url: string;

  @ApiProperty({ type: String, description: '已选中的图像地址' })
  @Column({
    type: 'text',
    nullable: true,
    comment: '已选中的图像地址',
  })
  public selected_img_url: string | null; // 使用联合类型，允许为 null

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

  @ApiProperty({ type: Number, description: '访问控制' })
  @Column({
    type: 'int',
    default: 0,
    comment: '0: private, 1: public',
    nullable: false, // 设置为非 NULL
  })
  public access_control: number;

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
