import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateProgramaResponsableDto } from './dto/create-programa-responsable.dto';
import { UpdateProgramaResponsableDto } from './dto/update-programa-responsable.dto';
import { ProgramaResponsableEntity } from './entities/programa-responsable.entity';
import { Repository } from 'typeorm';
import { EstadoEnum } from 'src/shared/enums/estado.enum';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { MessageResponse } from 'src/shared/entities/message-response';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgramaResponsableService {
  entityNameMessage = 'ProgramaResponsable';

  constructor(@InjectRepository(ProgramaResponsableEntity) private responsableRepository: Repository<ProgramaResponsableEntity>) {}

  async create(crearResponsableDto: CreateProgramaResponsableDto[]) {
    const buscar = await this.responsableRepository
      .find({ where: { programaId: crearResponsableDto[0].programaId, activo: true } })
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
      });

    if (buscar.length > 0) {
      for (let index = 0; index < buscar.length; index++) {
        const responsable = buscar[index];
        responsable.activo = false;
        responsable.estadoId = EstadoEnum.ELIMINADO;
        await this.responsableRepository.save(responsable).catch(e => {
          throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
        });
      }
    }

    for (let index = 0; index < crearResponsableDto.length; index++) {
      const responsable = crearResponsableDto[index];
      const nuevo = this.responsableRepository.create(responsable);
      nuevo.activo = true;
      nuevo.estadoId = EstadoEnum.ANIADIDO;
      await this.responsableRepository.save(nuevo).catch(e => {
        throw new UnprocessableEntityException(e.message, Message.errorCreate(this.entityNameMessage));
      });
    }
    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, crearResponsableDto);
  }

  findAll() {
    return `This action returns all programaResponsable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programaResponsable`;
  }

  async listarPorPrograma(programaId: number) {
    const lista = await this.responsableRepository
      .createQueryBuilder('responsable')
      //.leftJoinAndSelect('responsable.gestion', 'gestion')
      .leftJoinAndSelect('responsable.usuario', 'usuario')
      .where('responsable.activo and responsable.programaId = :programaId', { programaId })
      .orderBy('responsable.usuarioId', 'ASC')
      .getMany()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
      });
    const message = lista.length < 1 ? MessageEnum.ENTITY_SELECT_EMPTY : MessageEnum.ENTITY_SELECT;
    return new MessageResponse(HttpStatus.OK, message, lista);
  }

  update(id: number, updateProgramaResponsableDto: UpdateProgramaResponsableDto) {
    return `This action updates a #${id} programaResponsable`;
  }

  remove(id: number) {
    return `This action removes a #${id} programaResponsable`;
  }
}
