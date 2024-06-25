import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryColumn } from "typeorm";
@Entity('comment')
export class Comment {
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
  public userId: string;

  @ApiProperty({ type: String, description: '内容' })
  @Column({
    type: 'varchar',
    comment: '内容',
    nullable: false,
    default:''
  })
  public content: string;

  @ApiProperty({ type: String, description: '评论对象id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '评论对象id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public targetId: string;

  @ApiProperty({ type: String, description: '帖子id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '帖子id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public postId: string;

  @ApiProperty({ type: String, description: '创建时间' })
  @Column({
    type: 'datetime',
    comment: '创建时间',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createTime: Date;

  @ApiProperty({ type: String, description: '更新时间' })
  @Column({
    type: 'datetime',
    comment: '更新时间',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updateTime: Date;

  @ApiProperty({ type: String, description: '用户昵称' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户昵称',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public userName: string;

  @ApiProperty({ type: String, description: '用户头像' })
  @Column({
    type: 'varchar',
    comment: '用户头像',
    nullable: false,
    default: ''
  })
  public userAvatar: string;

  @ApiProperty({ type: String, description: '点赞数' })
  @Column({
    type: 'int',
    comment: '点赞数',
    nullable: false,
    default: 0
  })
  public likeCount: number;

}
