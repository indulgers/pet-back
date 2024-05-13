import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('post')
export class Post {
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
    length: 32,
    comment: '用户id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '标题' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '宠物名称',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public title: string;

  @ApiProperty({ type: String, description: '内容' })
  @Column({
    type: 'varchar',
    comment: '内容',
    nullable: false,
  })
  public content: string;

  @ApiProperty({ type: String, description: '封面' })
  @Column({
    type: 'varchar',
    comment: '封面',
    nullable: false,
  })
  public cover: string;

  @ApiProperty({ type: String, description: '种类' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '种类',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public category: string;

  @ApiProperty({ type: String, description: '创建时间' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  public create_time: Date;

  @ApiProperty({ type: String, description: '修改时间' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '修改时间',
  })
  public update_time: Date;

  @ApiProperty({ type: String, description: '是否删除' })
  @Column({
    type: 'int',
    comment: '是否删除',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为0
  })
  public is_delete: number;
}
