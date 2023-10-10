import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvConfigModule } from './config/env.config.module';
import { TypeOrmConfigModule } from './config/typeorm.config.module';
import { AuthController } from './endpoints/auth/auth.controller';
//
import { UserController } from "./endpoints/user/user.controller";
import { UserMapper } from "./mapper/user.mapper.service";
import { UserRepositoryModule } from "./repositories/user-repository/userRepository.module";
import { UserService } from "./services/user.service";
//
import { PingoController } from './endpoints/pingo/pingo.controller';
import { StationsController } from './endpoints/stations/stations.controller';
import PingoRepositoryModule from './repositories/pingo-repository/pingoRepository.module';
//
import { RolesController } from './endpoints/roles/roles.controller';
import { RoleMapper } from './mapper/role.mapper.service';
import MediaMapper from './mapper/media.mapper.service';
import PingoMapper from './mapper/pingo.mapper.service';
import StationMapper from './mapper/station.mapper.service';
import { RoleRepositoryModule } from './repositories/role-repository/roleRepository.module';
import PingoService from './services/pingo.service';
import { RoleService } from './services/role.service';
import { UserToPingoRepositoryModule } from './repositories/user-to-pingo-repository/userToPingoRepository.module';
import {StationService} from "./services/station.service";
import {StationRepositoryModule} from "./repositories/station-repository/stationRepository.module";
import {UserToStationRepositoryModule} from "./repositories/user-to-station-repository/userToStationRepository.module";
import {HashToPingoRepositoryModule} from "./repositories/hash-to-pingo-repository/hashToPingoRepository.module";
import {HashToPingoController} from "./endpoints/hashToPingo/hashToPingo.controller";
import {HashToPingoService} from "./services/hashToPingo.service";
import {HashToStationRepositoryModule} from "./repositories/hash-to-station-repository/hashToStationRepository.module";
import {HashToStationController} from "./endpoints/hashToStation/hashToStation.controller";
import {HashToStationService} from "./services/hashToStation.service";
import { AuthService } from './services/auth.service';
import {AuthConfigModule} from "./config/auth.config.module";
import { QrcodeController } from './endpoints/qrcode/qrcode.controller';
import {UserToStationController} from "./endpoints/user-to-station/userToStation.controller";
import {UserToStationService} from "./services/userToStation.service";
import {UserToPingoService} from "./services/userToPingo.service";
import {UserToPingoController} from "./endpoints/user-to-pingo/userToPingo.controller";
import { UserToPingoMapperService } from './mapper/user-to-pingo.mapper.service';
import { AutomapperConfigModule } from './config/automapper.config.module';
import {MediaController} from "./endpoints/media/media.controller";
import {MediaRepositoryModule} from "./repositories/media.repository/media.module";
import {MediaService} from "./services/media.service";
import {AwsConfigService} from "../aws.config";
import {ConfigModule} from "@nestjs/config";
import { ChatGateway } from './websocket/chatgateway';
import { ChatRepositoryModule } from './repositories/chat-repository/chat-repository.module';
import { ChatService } from './services/chat.service';
import { ChatController } from './endpoints/chat/chat.controller';



@Module({
  imports: [
    EnvConfigModule,
    AuthConfigModule,
    TypeOrmConfigModule,
    AutomapperConfigModule,
    PingoRepositoryModule,
    RoleRepositoryModule,
    UserRepositoryModule,
    UserToPingoRepositoryModule,
    StationRepositoryModule,
    UserToStationRepositoryModule,
    HashToPingoRepositoryModule,
    HashToStationRepositoryModule,
    MediaRepositoryModule,
    ConfigModule.forRoot(),
    ChatRepositoryModule
  ],
  controllers: [
    AppController,
    AuthController,
    PingoController,
    StationsController,
    UserController,
    RolesController,
    HashToPingoController,
    HashToStationController,
    QrcodeController,
    UserToStationController,
    UserToPingoController,
    ChatController,
    MediaController
  ],
  providers: [
    AuthService,
    UserService,
    RoleService,
    PingoService,
    StationService,
    HashToPingoService,
    HashToStationService,
    UserToStationService,
    UserToPingoService,
    MediaService,
    AwsConfigService,
    ChatGateway,
    ChatService
  ],
})


export class AppModule { }
