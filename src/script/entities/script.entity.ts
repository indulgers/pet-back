import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('script')
export class Script {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
  })
  public id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '文案名称' })
  @Column({
    type: 'varchar',
    length: 64,
    comment: '文案名称',
  })
  public script_name: string;

  @ApiProperty({ type: String, description: '文案URL' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '文案URL',
  })
  public script_url: string;

  @ApiProperty({ type: String, description: '用户id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '用户id',
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '版权信息' })
  @Column({
    type: 'text',
    comment: '版权信息',
  })
  public copyright_info: string;

  @ApiProperty({ type: String, description: '封面URL' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '封面URL',
  })
  public cover_url: string;

  @ApiProperty({ type: String, description: '文案类型' })
  @Column({
    type: 'varchar',
    length: 200,
    comment: '文案类型',
  })
  public type: string;

  @ApiProperty({ type: String, description: '文案全文' })
  @Column({
    type: 'longtext',
    comment: '文案全文',
  })
  public full_text: string;

  @ApiProperty({ type: String, description: '文案摘要' })
  @Column({
    type: 'text',
    comment: '文案摘要',
  })
  public summary: string;

  @ApiProperty({ type: Number, description: '上传类型' })
  @Column({
    type: 'int',
    default: 0,
    comment: '上传类型 (1: 通过文件, 2: 通过复制粘贴)',
  })
  public upload_type: number;

  @ApiProperty({ type: Number, description: '文案状态' })
  @Column({
    type: 'int',
    nullable: true,
    comment: '文案状态 (0: 解析中, 1: 解析成功, 2: 解析失败, 3: 已删除)',
  })
  public status: number;

  @ApiProperty({ type: Number, description: '访问控制' })
  @Column({
    type: 'int',
    default: 0,
    comment: '访问控制 (0: 私有, 1: 公共)',
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
