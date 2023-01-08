import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ type : DataType.INTEGER, primaryKey : true, allowNull : false, autoIncrement : true })
  id : number

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}