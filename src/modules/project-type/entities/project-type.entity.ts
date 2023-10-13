import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('project_style')
export class ProjectStyle {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ type: String, description: 'style_name' })
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'style_name',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public style_name: string;

  @ApiProperty({ type: String, description: 'model_id' })
  @Column({
    type: 'varchar',
    length: 20,
    comment: 'model_id',
    nullable: true, // 允许为 NULL
  })
  public model_id: string;

  @ApiProperty({ type: String, description: 'model_name' })
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'model_name',
    nullable: true, // 允许为 NULL
  })
  public model_name: string;

  @ApiProperty({ type: String, description: 'demo_url' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'demo_url',
    nullable: true, // 允许为 NULL
  })
  public demo_url: string;

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
