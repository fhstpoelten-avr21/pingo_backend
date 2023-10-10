import { Test, TestingModule } from '@nestjs/testing';
import HashToStation from "../../model/entities/hashToStation.entity";
import {HashToStationController} from "./hashToStation.controller";

describe('HashToStationController', () => {
    let controller: HashToStationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HashToStationController],
        }).compile();

        controller = module.get<HashToStationController>(HashToStationController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});