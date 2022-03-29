import { ApiProperty } from '@nestjs/swagger';

export class URLMessage {
  @ApiProperty({ example: "kg412w", description: 'Url or short part of url' })
  url = "";

  @ApiProperty({ example: true, description: 'Is request successful' })
  success = true;
}

export class StatusMessage {
  @ApiProperty({ example: true, description: 'Is request successful' })
  success = true;

  @ApiProperty({ example: "not ok", description: 'error message', nullable: true })
  message?: string;
}

export class CreateShortURLMessage {
  @ApiProperty({ example: "ya.ru", description: 'Full url' })
  url = "";
  @ApiProperty({ example: "mytest0", description: 'Suggested short url', nullable: true })
  suggested?: string;
}
