import { Test, TestingModule } from '@nestjs/testing';
import {UserToStationController} from "./userToStation.controller";

describe('Controller', () => {
  let controller: UserToStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToStationController],
    }).compile();

    controller = module.get<UserToStationController>(UserToStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
