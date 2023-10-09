import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn, PrimaryGeneratedColumn
} from "typeorm";
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
  })
  public script_id: string;

  @ApiProperty({ type: Number, description: '章节序号' })
  @Column({
    type: 'int',
    default: 0,
    comment: '章节序号',
  })
  public chapter_number: number;

  @ApiProperty({ type: String, description: '章节名称' })
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '章节名称',
  })
  public chapter_name: string;

  @ApiProperty({ type: String, description: '章节角色' })
  @Column({
    type: 'text',
    comment: '章节角色 (所有角色的JSON数组)',
  })
  public chapter_roles: string;

  @ApiProperty({ type: String, description: '章节内容' })
  @Column({
    type: 'text',
    comment: '章节内容',
  })
  public chapter_content: string;

  @ApiProperty({ type: String, description: '文案数据' })
  @Column({
    type: 'longtext',
    comment: '文案数据',
  })
  public script_data: string;

  @ApiProperty({ type: Number, description: '章节状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '章节状态',
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
