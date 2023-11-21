import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudEntity } from './administracion/solicitud/entities/solicitud.entity';
import { AdministracionModule } from './administracion/administracion.module';
import { SolicitudDetalleEntity } from './administracion/solicitud-detalle/entities/solicitud-detalle.entity';
import { PlanificacionModule } from './planificacion/planificacion.module';
import { PptoModule } from './ppto/ppto.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { AutorizacionModule } from './autorizacion/autorizacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'developers',
      password: '123456',
      database: 'ppp',
      entities: [SolicitudEntity, SolicitudDetalleEntity],
      synchronize: false,
      autoLoadEntities: true,
      retryAttempts: 10,
    }),
    AutorizacionModule,
    AdministracionModule,
    PlanificacionModule,
    PptoModule,
    CatalogoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
