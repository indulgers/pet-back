import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from '@/common';
import { guid } from '@/common/utils/utils';
import axios from 'axios';
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
    axios.post('http://localhost:6006/add_post_to_lib', {
      post_id: newPost.id,
      title: newPost.title,
    })
    
    return ResultData.ok(newPost);
  }

  async findAll(title?:string): Promise<ResultData<Post[]>> {
    const res = await axios.post('http://localhost:6006/search_posts', {
      input: title,
    })
    const ids = res.data.map(post => post.post_id);
    if(res.data.length > 0){
      const posts = await this.postRepository.findByIds(ids);
      return ResultData.ok(posts);
    }
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
