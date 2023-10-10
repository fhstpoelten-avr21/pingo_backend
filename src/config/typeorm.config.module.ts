import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as 'mysql' | 'mariadb',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME,
            entities: [__dirname + '/../**/*.entity.{js,ts}' ],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true,
            // dropSchema: true,
        })
    ]
})
export class TypeOrmConfigModule { }
