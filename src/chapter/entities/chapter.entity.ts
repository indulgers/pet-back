import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('chapter')
export class Chapter {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryGeneratedColumn()
  public id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 64,
    comment: '文案id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public script_id: string;

  @ApiProperty({ type: Number, description: '章节序号' })
  @Column({
    type: 'int',
    default: 0,
    comment: '章节序号',
    nullable: false, // 设置为非 NULL
  })
  public chapter_number: number;

  @ApiProperty({ type: String, description: '章节名称' })
  @Column({
    type: 'varchar',
    length: 64,
    comment: '章节名称',
    nullable: true, // 允许为 NULL
    default: null, // 默认值为 NULL
  })
  public chapter_name: string | null; // 使用联合类型，允许为 null

  @ApiProperty({ type: String, description: '章节角色' })
  @Column({
    type: 'text',
    comment: '章节角色 (所有角色的JSON数组)',
    nullable: true,
  })
  public chapter_roles: string;

  @ApiProperty({ type: String, description: '章节内容' })
  @Column({
    type: 'text',
    comment: '章节内容',
    nullable: true,
  })
  public chapter_content: string;

  @ApiProperty({ type: String, description: '文案数据' })
  @Column({
    type: 'longtext',
    comment: '文案数据',
    nullable: true,
  })
  public script_data: string;

  @ApiProperty({ type: Number, description: '章节状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '章节状态',
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
