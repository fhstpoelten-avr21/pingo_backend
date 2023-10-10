import { AutoMap } from "@automapper/classes";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default class Meta{
    @AutoMap()
    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @AutoMap()
    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;

    @AutoMap()
    @DeleteDateColumn({name: "removed_at"})
    removedAt: Date;
}