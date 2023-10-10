import { Test, TestingModule } from '@nestjs/testing';
import {UserToPingoController} from "./userToPingo.controller";


describe('Controller', () => {
  let controller: UserToPingoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToPingoController],
    }).compile();

    controller = module.get<UserToPingoController>(UserToPingoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
