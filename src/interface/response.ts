import { ApiProperty } from '@nestjs/swagger';

export class ListResult<T> {
  @ApiProperty({ type: String, description: '总数' })
  total: number;
  @ApiProperty({ type: () => Array<T>, description: '列表数据' })
  data: T[];
}
