// 在操作日志管理表中创建一个日志实体
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('operation')
export class Operation {
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    comment: 'id',
    default: '',
  })
  id: string;
  @Column({
    type: 'varchar',
    length: 32,
    comment: '日志id',
    default: '',
  })
  log_id: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '操作模块',
    default: '',
  })
  model: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '操作类型',
    default: '',
  })
  mode: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '操作人id',
    default: '',
  })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '操作人ip',
    default: '',
  })
  ip: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '操作状态',
    default: '',
  })
  state: string;

  @Column({
    type: 'datetime',
    comment: '操作时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '操作地址',
    default: '',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '操作方式',
    default: '',
  })
  way: string;

  @Column({
    type: 'varchar',
    comment: '请求参数',
    default: '',
  })
  request_para: string;

  @Column({
    type: 'varchar',
    comment: '返回参数',
    default: '',
  })
  return_para: string;

  @Column({
    type: 'varchar',
    comment: '错误信息',
    default: '',
  })
  error_mes: string;
}
