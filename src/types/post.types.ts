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

export enum PostedDirection {
    lte = 'lte',
    gte = 'gte'
}

export class GetPostsPayloadType{
    views? : boolean
    posted? : string
    posted_direction? : PostedDirection
    offset? : number
    limit? : number
}