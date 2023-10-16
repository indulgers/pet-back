import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../project/entities/project.entity';
import { Chapter } from '../../chapter/entities/chapter.entity';
import { Artifact } from '../../artifact/entities/artifact.entity';
import { User } from '../../user/entities/user.entity';
import { WorldView } from '../../world-view/entities/world-view.entity';

@Entity('script')
export class Script {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  public id: string;

  @ApiProperty({ type: String, description: '文案id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '文案id',
    default: '',
  })
  public script_id: string;

  @ApiProperty({ type: String, description: '文案名称' })
  @Column({
    type: 'varchar',
    length: 64,
    comment: '文案名称',
    default: '', // 默认值为空字符串
  })
  public script_name: string;

  @ApiProperty({ type: String, description: '文案URL' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '文案URL',
    default: '', // 默认值为空字符串
  })
  public script_url: string;

  @ApiProperty({ type: String, description: '版权信息' })
  @Column({
    type: 'text',
    comment: '版权信息',
    nullable: true,
  })
  public copyright_info: string;

  @ApiProperty({ type: String, description: '封面URL' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '封面URL',
    nullable: true,
  })
  public cover_url: string | null; // 使用联合类型，允许为 null

  @ApiProperty({ type: String, description: '文案类型' })
  @Column({
    type: 'varchar',
    length: 200,
    comment: '文案类型',
    nullable: true,
  })
  public type: string;

  @ApiProperty({ type: String, description: '文案全文' })
  @Column({
    type: 'longtext',
    comment: '文案全文',
    nullable: true,
  })
  public full_text: string;

  @ApiProperty({ type: String, description: '文案摘要' })
  @Column({
    type: 'text',
    comment: '文案摘要',
    nullable: true,
  })
  public summary: string;

  @ApiProperty({ type: Number, description: '上传类型' })
  @Column({
    type: 'int',
    default: 0,
    comment: '上传类型 (1: 通过文件, 2: 通过复制粘贴)',
    nullable: true, // 允许为 NULL
  })
  public upload_type: number;

  @ApiProperty({ type: Number, description: '文案状态' })
  @Column({
    type: 'int',
    nullable: true, // 允许为 NULL
    comment: '文案状态 (0: 解析中, 1: 解析成功, 2: 解析失败, 3: 已删除)',
    default: null, // 默认值为 NULL
  })
  public status: number | null; // 使用联合类型，允许为 null

  @ApiProperty({ type: Number, description: '访问控制' })
  @Column({
    type: 'int',
    default: 0,
    comment: '访问控制 (0: 私有, 1: 公共)',
    nullable: true,
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

  @OneToMany(() => Project, (project) => project.script, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public projects: Project[];

  @OneToMany(() => Chapter, (chapter) => chapter.script, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public chapters: Chapter[];

  @OneToMany(() => Artifact, (artifact) => artifact.script, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public artifacts: Artifact[];

  @OneToMany(() => WorldView, (worldview) => worldview.script, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public worldviews: WorldView[];

  @ManyToOne(() => User, (user) => user.scripts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
