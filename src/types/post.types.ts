export class CreatePostPayloadType{
    title : string
    content : string
}

export class EditPostPayloadType{
    id : number
    title? : string
    content? : string
}

export class DeletePostPayloadType{
    id : number
}

export class GetPostPayloadType{
    slug : number
}

enum PostedDirection {
    lte = 'lte',
    gte = 'gte'
}

export class GetPostsPayloadType{
    views? : boolean
    posted? : string
    posted_direction? : PostedDirection = PostedDirection.gte
    offset? : number = 0
    limit? : number = 10
}