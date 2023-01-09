import { Inject, Injectable } from "@nestjs/common";
import { Like } from "src/modules/like/like.entity";
import { Post } from "src/modules/post/post.entity";


@Injectable()
export class LikeService {
    constructor(
        @Inject('LIKE_REPOSITORY') private LikeRepo : typeof Like,
        @Inject('POST_REPOSITORY') private PostRepo : typeof Post
    ){}
}