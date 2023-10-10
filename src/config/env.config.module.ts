import { ConfigModule } from '@nestjs/config';
import { Module, Global } from "@nestjs/common";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
        }),
    ]
})
export class EnvConfigModule { }
