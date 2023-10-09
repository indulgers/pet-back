import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('world_view')
export class WorldView {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryColumn({
    type: 'int',
    comment: 'id',
  })
  public id: number;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '类型' })
  @Column({
    type: 'varchar',
    length: 20,
    comment: '人物，或者场景等',
  })
  public type: string;

  @ApiProperty({ type: String, description: '实体id' })
  @Column({
    type: 'varchar',
    length: 10,
    default: '',
    comment: '实体id',
  })
  public entity_id: string;

  @ApiProperty({ type: String, description: '实体名称' })
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '实体名称',
  })
  public entity_name: string;

  @ApiProperty({ type: String, description: '实体描述' })
  @Column({
    type: 'longtext',
    comment: '实体描述',
  })
  public entity_desc: string;

  @ApiProperty({ type: String, description: '演示链接' })
  @Column({
    type: 'text',
    nullable: true,
    comment: '演示链接',
  })
  public demo_url: string;

  @ApiProperty({ type: String, description: 'Lora ID' })
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  public lora_id: string;

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
