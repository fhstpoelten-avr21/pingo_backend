import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService {
    private readonly s3: AWS.S3;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new AWS.S3({
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            region: configService.get<string>('AWS_REGION'),
        });
    }

    getS3Instance(): AWS.S3 {
        return this.s3;
    }
}
