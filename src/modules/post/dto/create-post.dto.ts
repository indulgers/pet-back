import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePostDto {
    @IsNotEmpty({ message: '标题不能为空' })
    @ApiProperty({ description: '标题' })
    title: string;

    @IsNotEmpty({ message: '内容不能为空' })
    @ApiProperty({ description: '内容' })
    content: string;

    @IsNotEmpty({ message: '种类不能为空'})
    @ApiProperty({ description: '种类'})
    category: string;

    @IsNotEmpty({ message: '用户id不能为空' })
    @ApiProperty({ description: '用户id' })

    userId: string;
}
