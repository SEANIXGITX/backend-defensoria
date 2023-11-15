import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorEntity } from './entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProveedorEntity])],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
