import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'url' })
export class Url {
  @PrimaryColumn()
  shorturl: string;

  @Column()
  fullurl: string;

  @Column()
  count: number;
}
