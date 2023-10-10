

import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import * as qrcode from 'qrcode';




@ApiTags('qrcode')
@Controller('qrcode')
export class QrcodeController {
    
    @Get(':data')
    @ApiOperation({ summary: 'Generate QR code' })
    @ApiParam({ name: 'hash', type: 'string', required: true })
    @ApiOkResponse({ description: 'QR code successfully generated' })
    async generateQrCode(@Param('data') data: string, @Res() res: Response) {
      try {
        console.log("DATA:", data);
        
        const preUrl= "https://pingo-app.at/join/?hash="
        const qrCodeBuffer = await qrcode.toBuffer(preUrl+data);
        res.set('Content-Type', 'image/png');
        res.send(qrCodeBuffer);
      } catch (error) {
        // Handle error
        res.status(500).send('Error generating QR code');
      }
      return res;
    }
   
}
