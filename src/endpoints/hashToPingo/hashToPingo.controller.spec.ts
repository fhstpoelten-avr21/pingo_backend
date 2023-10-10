import { Test, TestingModule } from '@nestjs/testing';
import {HashToPingoController} from "./hashToPingo.controller";

describe('HashToPingoController', () => {
    let controller: HashToPingoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HashToPingoController],
        }).compile();

        controller = module.get<HashToPingoController>(HashToPingoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});