import { Module } from '@nestjs/common';
import { GestionService } from './gestion.service';
import { GestionController } from './gestion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestionEntity } from './entities/gestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GestionEntity])],
  controllers: [GestionController],
  providers: [GestionService],
})
export class GestionModule {}
