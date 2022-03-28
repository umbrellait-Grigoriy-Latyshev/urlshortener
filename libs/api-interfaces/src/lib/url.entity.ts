import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'url' })
export class Url {
  @PrimaryColumn()
  shorturl: string;

  @Column()
  fullurl: string;

  @Column()
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor(shorturl: string, fullurl: string) {
    this.shorturl = shorturl;
    this.fullurl = fullurl;
    this.count = 1;
    this.createdAt = new Date(Date.now());
  }
}
