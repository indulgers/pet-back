import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn, ManyToOne, JoinColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Project } from "../../project/entities/project.entity";
import { Script } from "../../script/entities/script.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";
import { User } from "../../user/entities/user.entity";

@Entity('artifact')
export class Artifact {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  public id: string;


  @ApiProperty({ type: String, description: '流程id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '流程id',
    nullable: false, // 设置为非 NULL
  })
  public flow_id: string;

  @ApiProperty({ type: String, description: '用户id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '用户id',
    nullable: false, // 设置为非 NULL
    unique: true, // 唯一约束
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
    nullable: false, // 设置为非 NULL
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '章节id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '章节id',
    nullable: false, // 设置为非 NULL
  })
  public chapter_id: string;

  @ApiProperty({ type: Number, description: '章节序号' })
  @Column({
    type: 'int',
    comment: '章节序号',
    nullable: false, // 设置为非 NULL
  })
  public chapter_number: number;

  @ApiProperty({ type: String, description: '样式' })
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true, // 允许为 NULL
    collation: 'utf8mb4_general_ci',
    comment: '样式',
    default: null, // 默认值为 NULL
  })
  public style: string | null; // 使用联合类型，允许为 null

  @ApiProperty({ type: Number, description: '总体状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '总体状态',
    nullable: false, // 设置为非 NULL
  })
  public overall_status: number;

  @ApiProperty({ type: Number, description: '选图状态' })
  @Column({
    type: 'int',
    default: 0,
    comment: '选图状态',
    nullable: false, // 设置为非 NULL
  })
  public selection_status: number;

  @ApiProperty({ type: String, description: '已选图片信息' })
  @Column({
    type: 'longtext',
    comment: '已选图片信息',
    nullable: true,
  })
  public selected_imgs: string;

  @ApiProperty({ type: String, description: '已保存图片信息' })
  @Column({
    type: 'longtext',
    comment: '已保存图片信息',
    nullable: true,
  })
  public saved_imgs: string;

  @ApiProperty({ type: String, description: '图片信息' })
  @Column({
    type: 'longtext',
    comment: '图片信息',
    nullable: true,
  })
  public imgs_info: string;

  @ApiProperty({ type: Number, description: '发布状态' })
  @Column({
    type: 'int',
    default: 1,
    comment: '-1: deleted, 1: unpublished, 2: published',
    nullable: true,
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

  @ManyToOne(() => Project, (project) => project.artifacts)
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @ManyToOne(() => Script, (script) => script.artifacts)
  @JoinColumn({ name: 'script_id' })
  public script: Script;

  @ManyToOne(() => Chapter, (chapter) => chapter.artifacts)
  @JoinColumn({ name: 'chapter_id' })
  public chapter: Chapter;

  @ManyToOne(() => User, (user) => user.artifacts)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
