import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Script } from '../../script/entities/script.entity';

@Entity('project')
export class Project {
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
    comment: '项目id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public project_id: string;

  @ApiProperty({ type: String, description: '用户id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '用户id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    comment: '文案id',
    nullable: false,
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '样式' })
  @Column({
    type: 'varchar',
    length: 200,
    comment: '样式',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public style: string;

  @ApiProperty({ type: String, description: '角色信息' })
  @Column({
    type: 'longtext',
    comment: '角色信息',
    nullable: true, // 允许为 NULL
  })
  public roles_info: string;

  @ApiProperty({ type: String, description: '封面URL' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '封面URL',
    nullable: true, // 允许为 NULL
  })
  public cover_url: string;

  @ApiProperty({ type: Number, description: '项目状态' })
  @Column({
    type: 'int',
    comment: '项目状态 (0: 解析中, 1: 解析成功, 2: 解析失败)',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为数字 0
  })
  public status: number;

  @ApiProperty({ type: Number, description: '访问控制' })
  @Column({
    type: 'int',
    comment: '访问控制 (0: 私有, 1: 公共)',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为数字 0
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
