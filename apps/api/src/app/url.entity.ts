import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryColumn()
  shorturl: string;

  @Column()
  fullurl: string;
}
