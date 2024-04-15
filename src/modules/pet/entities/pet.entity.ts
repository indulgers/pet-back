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
@Entity('pet')
export class Pet {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  public id: string;

  @ApiProperty({ type: String, description: '宠物id' })
  @Column({
    type: 'varchar',
    comment: '宠物id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public pet_id: string;

  @ApiProperty({ type: String, description: '用户id' })
  @Column({
    type: 'varchar',
    length: 32,
    comment: '用户id',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public user_id: string;

  @ApiProperty({ type: String, description: '宠物名称' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '宠物名称',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public name: string;

  @ApiProperty({ type: String, description: '宠物种类' })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '宠物种类',
    nullable: false, // 设置为非 NULL
    default: '', // 默认值为空字符串
  })
  public type: string;

  @ApiProperty({ type: String, description: '宠物性别' })
  @Column({
    type: 'int',
    comment: '宠物性别',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为0
  })
  public sex: number;

  @ApiProperty({ type: String, description: '宠物年龄' })
  @Column({
    type: 'int',
    comment: '宠物年龄',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为0
  })
  public age: number;

  @ApiProperty({ type: String, description: '宠物生日' })
  @Column({
    type: 'date',
    comment: '宠物生日',
    nullable: false, // 设置为非 NULL
    default: '1970-01-01', // 默认值为1970-01-01
  })
  public birthday: string;

  @ApiProperty({ type: String, description: '是否绝育' })
  @Column({
    type: 'int',
    comment: '是否绝育',
    nullable: false, // 设置为非 NULL
    default: 0, // 默认值为0
  })
  public is_sterilization: number;

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
