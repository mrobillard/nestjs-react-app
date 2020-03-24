import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "NextJS + React App"', () => {
      expect(appController.root()).toBe('NextJS + React App');
    });
  });

  describe('version', () => {
    it('should return package.json version', () => {
      expect(appController.getVersion()).toBe('Version: 1.0');
    });
  });
});
