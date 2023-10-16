import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Script } from '../../script/entities/script.entity';

@Entity('world_view')
export class WorldView {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  public id: string;

  @ApiProperty({ type: String, description: '类型' })
  @Column({
    type: 'varchar',
    length: 20,
    comment: '人物，或者场景等',
    nullable: false, // 设置为非 NULL
  })
  public type: string;

  @ApiProperty({ type: String, description: '实体id' })
  @Column({
    type: 'varchar',
    length: 10,
    default: '',
    comment: '实体id',
    nullable: false, // 设置为非 NULL
  })
  public entity_id: string;

  @ApiProperty({ type: String, description: '实体名称' })
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true, // 允许为 NULL
    comment: '实体名称',
  })
  public entity_name: string | null; // 使用联合类型，允许为 null

  @ApiProperty({ type: String, description: '实体描述' })
  @Column({
    type: 'longtext',
    comment: '实体描述',
    nullable: true,
  })
  public entity_desc: string;

  @ApiProperty({ type: String, description: '演示地址' })
  @Column({
    type: 'text',
    nullable: true, // 允许为 NULL
    comment: '演示地址',
  })
  public demo_url: string | null; // 使用联合类型，允许为 null

  @ApiProperty({ type: String, description: 'Lora ID' })
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true, // 允许为 NULL
  })
  public lora_id: string | null; // 使用联合类型，允许为 null

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

  @ManyToOne(() => Script, (script) => script.worldviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'script_id' })
  public script: Script;
}
