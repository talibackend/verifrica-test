export class CreatePostPayloadType{
    title : string
    content : string
}

export class EditPostPayloadType{
    id : number
    title? : string
    content? : string
}

export class DeletePayloadType{
    id : number
}