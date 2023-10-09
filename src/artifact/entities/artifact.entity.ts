import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('artifact')
export class Artifact {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
  })
  public id: string;

  @ApiProperty({ type: String, description: '项目id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '项目id',
  })
  public project_id: string;

  @ApiProperty({ type: String, description: '流程id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '流程id',
  })
  public flow_id: string;

  @ApiProperty({ type: String, description: '用户id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '用户id',
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '章节id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '章节id',
  })
  public chapter_id: string;

  @ApiProperty({ type: Number, description: '章节序号' })
  @Column({
    type: 'int',
    comment: '章节序号',
  })
  public chapter_number: number;

  @ApiProperty({ type: String, description: '样式' })
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    collation: 'utf8mb4_general_ci',
    comment: '样式',
  })
  public style: string;

  @ApiProperty({ type: Number, description: '总体状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '总体状态',
  })
  public overall_status: number;

  @ApiProperty({ type: Number, description: '选图状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '选图状态',
  })
  public selection_status: number;

  @ApiProperty({ type: String, description: '已选图片信息' })
  @Column({
    type: 'longtext',
    comment: '已选图片信息',
  })
  public selected_imgs: string;

  @ApiProperty({ type: String, description: '已保存图片信息' })
  @Column({
    type: 'longtext',
    comment: '已保存图片信息',
  })
  public saved_imgs: string;

  @ApiProperty({ type: String, description: '图片信息' })
  @Column({
    type: 'longtext',
    comment: '图片信息',
  })
  public imgs_info: string;

  @ApiProperty({ type: Number, description: '发布状态' })
  @Column({
    type: 'int',
    default: 1,
    comment: '发布状态',
  })
  public publish_status: number;

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
