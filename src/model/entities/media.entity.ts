import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Station from "./station.entity";
import Pingo from "./pingo.entity";
import Meta from "./meta.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export default class Media extends Meta{
    
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @AutoMap()
    @Column()
    name: string;
    
    @AutoMap()
    @Column()
    type: string;
    
    @AutoMap()
    @Column()
    url: string;

    @AutoMap(() => Pingo)
    @ManyToOne(() => Pingo, pingo => pingo.media, {eager: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "pingo_id", referencedColumnName: "id" })
    pingo: Pingo;

    @AutoMap(() => Station)
    @ManyToOne(() => Station, station => station.media, {eager: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "station_id", referencedColumnName: "id" })
    station: Station;
}