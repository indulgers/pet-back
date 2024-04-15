import { ApiProperty } from '@nestjs/swagger';
export class CreatePetDto {
  @ApiProperty({
    description: '宠物名称',
    example: '小黑',
  })
  name: string;

  @ApiProperty({
    description: '宠物种类',
    example: '猫',
  })
  type: string;

  @ApiProperty({
    description: '宠物性别',
    example: 1,
  })
  sex: number;

  @ApiProperty({
    description: '宠物年龄',
    example: 2,
  })
  age: number;

  @ApiProperty({
    description: '用户id',
    example: '1',
  })
  user_id: string;
}
