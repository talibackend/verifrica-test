import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table
export class Follow extends Model{
    @Column({ type : DataType.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true })
    id : number

    @Column({ type : DataType.INTEGER, references : { model : User, key : 'id' }, allowNull : false })
    follower : number

    @Column({ type : DataType.INTEGER, references : { model : User, key : 'id' }, allowNull : false })
    followed : number
}