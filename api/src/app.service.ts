import { Injectable } from '@nestjs/common';

//import * as pack from '../package.json';

@Injectable()
export class AppService {
  root(): string {
    return 'NextJS + React App';
  }

  getVersion(): string {
    return 'Version: 1.0';
  }
}
