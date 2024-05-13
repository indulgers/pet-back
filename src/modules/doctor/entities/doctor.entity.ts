import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('doctor')
export class Doctor {
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
    comment: '医生id',
    default: '',
  })
  doctor_id: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '医生身份证',
    default: '',
  })
  id_card: string;
  @Column({
    type: 'varchar',
    length: 32,
    comment: '医生姓名',
    default: '',
  })
  name: string;

  @Column({
    type: 'int',
    comment: '医生性别',
    default: 0,
  })
  sex: number;

  @Column({
    type: 'int',
    comment: '医生年龄',
    default: 0,
  })
  age: number;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '医生科室',
    default: '',
  })
  department: string;

  @Column({
    type: 'varchar',
    length: 32,
    comment: '医生执照',
    default: '',
  })
  license: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '医生头像',
    default: '',
  })
  avatar: string;

  

  @Column({
    type: 'datetime',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
}
