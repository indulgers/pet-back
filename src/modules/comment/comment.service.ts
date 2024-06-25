import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { ResultData } from 'src/common/utils/result';
@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>;

  
  create(createCommentDto: CreateCommentDto) :ResultData<Comment>{
    if(!createCommentDto.postId){
      return ResultData.error('postId不能为空');
    }
    if(!createCommentDto.userId){ 
      return ResultData.error('userId不能为空');
    }
    const newComment = this.commentRepository.create(createCommentDto);
    this.commentRepository.save(newComment);
    return ResultData.ok(newComment);
  }

  async findPostComments(postId: string): Promise<ResultData<Comment[]>> {
    const comments =await this.commentRepository.find({
      where: { postId },
      order: { createTime: 'DESC' },
    });

    return ResultData.ok(comments);
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
