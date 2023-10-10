import { AutoMap } from "@automapper/classes";

export class MetaDto{
    @AutoMap()
    createdAt?: Date;
    @AutoMap()
    updatedAt?: Date;
    @AutoMap()
    removedAt?: Date;
}