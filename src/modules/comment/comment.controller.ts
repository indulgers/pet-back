import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('comment')
@ApiTags('评论')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiCreatedResponse({ type: Comment })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':postId')
  @ApiParam({ name: 'postId', description: '帖子ID' })
  findPostComments(@Param('postId') postId: string) {
    return this.commentService.findPostComments(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
