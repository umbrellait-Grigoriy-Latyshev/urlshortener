import { Url } from '@evolving/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {

  constructor(@InjectRepository(Url) private repo: Repository<Url>) { }

  public async clean(days: number) {
    if (days < 0)
      days = -days;
    console.log(`Called clean(${days})`);
    const today = new Date(Date.now());
    const urls = await this.repo.createQueryBuilder("url")
      .where("date_part('day', :today - url.createdAt) >= :days", { today: today, days: days })
      .getMany();
    console.log(`Asking for remove the following urls (${urls.length}):`)
    urls.forEach(e => console.log(JSON.stringify(e)));
    await this.repo.remove(urls);
    console.log("Removed.")
  }




}
