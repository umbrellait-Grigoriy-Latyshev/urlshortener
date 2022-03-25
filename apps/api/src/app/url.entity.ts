import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'url' })
export class Url {
  @PrimaryColumn()
  shorturl: string;

  @Column()
  fullurl: string;

  @Column()
  count: number;

  @Column()
  day: number;

  constructor(shorturl: string, fullurl: string) {
    this.shorturl = shorturl;
    this.fullurl = fullurl;
    this.count = 1;
    this.day = new Date(Date.now()).getDate();
  }
}
