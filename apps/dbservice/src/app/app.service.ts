import { Url } from '@evolving/api-interfaces';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {

  public clean(repo: Repository<Url>) {
    return async (days: number) => {
      if (days < 0)
        days = -days;
      console.log(`Called clean(${days})`);
      const today = new Date(Date.now());
      const urls = await repo.createQueryBuilder("url")
        .where("date_part('day', :today - url.createdAt) >= :days", { today: today, days: days })
        .getMany();

      console.log(`Asking for remove the following urls (${urls.length}):`)
      urls.forEach(e => console.log(JSON.stringify(e)));
      await repo.remove(urls);
      console.log("Removed.")
    }
  }




}
