import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from '@/common';
import { guid } from '@/common/utils/utils';
@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  async create(createPostDto: CreatePostDto): Promise<ResultData<Post>> {
    const newPost = this.postRepository.create(createPostDto);
    newPost.id = guid() 
    newPost.create_time = new Date();
    newPost.user_id = createPostDto.userId;
    await this.postRepository.save(newPost);
    return ResultData.ok(newPost);
  }

  async findAll(): Promise<ResultData<Post[]>> {
    const posts = await this.postRepository.find();
    return ResultData.ok(posts);
  }
  async findMyPosts(user_id: string): Promise<ResultData<Post[]>> {
    const posts = await this.postRepository.find({where: {user_id}});
    return ResultData.ok(posts);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<ResultData> {
    const post = await this.postRepository.findOne({where:{id}});
    if(!post){
      return ResultData.fail(404, 'pet not found');
    }
    this.postRepository.update(id, updatePostDto);
    return ResultData.ok();
  }

  async remove(id: string) :Promise<ResultData> {
    const post = await this.postRepository.findOne({where:{id}});
    if(!post){
      return ResultData.fail(404, 'pet not found');
    }
    this.postRepository.remove(post)
    return ResultData.ok();
  }
}
