import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table

export class Post extends Model {
    @Column({ type : DataType.INTEGER, primaryKey : true, autoIncrement : true, allowNull : false })
    id : number

    @Column({ type : DataType.INTEGER, allowNull : false, references : { model : User, key : 'id' } })
    user_id : number

    @Column({ type : DataType.TEXT, allowNull : false })
    content : string

    @Column({ type : DataType.INTEGER, defaultValue : 0 })
    views : number

    @Column({ type : DataType.STRING, allowNull : false })
    title : string

    @Column({ type : DataType.STRING, allowNull : false })
    slug : string
}