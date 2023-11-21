import { Module } from '@nestjs/common';
import { ProgramaResponsableService } from './programa-responsable.service';
import { ProgramaResponsableController } from './programa-responsable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaResponsableEntity } from './entities/programa-responsable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaResponsableEntity])],
  controllers: [ProgramaResponsableController],
  providers: [ProgramaResponsableService],
  exports: [ProgramaResponsableService]
})
export class ProgramaResponsableModule {}
