import { Table, Model, DataType, Column } from 'sequelize-typescript';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Table
export class Like extends Model {
    @Column({ primaryKey : true, allowNull : false, type : DataType.INTEGER, autoIncrement : true })
    id : number

    @Column({ type : DataType.INTEGER, references : { model : Post, key : 'id' }, allowNull : false })
    post_id : number

    @Column({ type : DataType.INTEGER, references : { model : User, key : 'id' }, allowNull : false })
    user_id : number
}