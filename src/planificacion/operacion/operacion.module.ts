import { Module } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { OperacionController } from './operacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionEntity } from './entities/operacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperacionEntity])],
  controllers: [OperacionController],
  providers: [OperacionService],
})
export class OperacionModule {}
