import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Script } from '../../script/entities/script.entity';
import { Project } from '../../project/entities/project.entity';
import { Artifact } from '../../artifact/entities/artifact.entity';

@Entity('user')
export class User {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  public id: string;

  @ApiProperty({ type: String, description: '用户id' })
  @Column({
    type: 'varchar',
    length: 64,
    comment: '用户id',
    default: '',
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '用户登录名' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户昵称',
    default: '',
  })
  nickname: string;

  @ApiProperty({ type: String, description: '手机号' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '手机号',
    default: '0',
  })
  mobile: string;

  @ApiProperty({ type: Number, description: '角色' })
  @Column({
    type: 'int',
    comment: '角色',
    default: () => 0,
  })
  role: number;

  @ApiProperty({ type: Number, description: '用户状态' })
  @Column({
    type: 'int',
    comment: '用户状态',
    default: () => 0,
  })
  status: number;

  @ApiProperty({ type: String, description: '' })
  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @OneToMany(() => Script, (script) => script.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public scripts: Script[];

  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public projects: Project[];

  @OneToMany(() => Artifact, (artifact) => artifact.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public artifacts: Artifact[];
}
