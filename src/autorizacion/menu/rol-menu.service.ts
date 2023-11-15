import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { Repository } from 'typeorm';
import { RolEntity } from '../rol/entities/rol.entity';
import { CreateRolesMenuDto } from './dto/create-roles-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { RolMenuEntity } from './entities/rol-menu.entity';
@Injectable()
export class RolMenuService {
  private readonly logger = new Logger(RolMenuService.name);
  constructor(
    @InjectRepository(RolMenuEntity) private rolMenuRepository: Repository<RolMenuEntity>,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
    @InjectRepository(RolEntity) private rolRepository: Repository<RolEntity>,
  ) {}

  async obtenerMenusPorRol(idRol: number): Promise<MessageResponse<any>> {
    const lista = await this.rolMenuRepository
      .createQueryBuilder('rolMenu')
      .leftJoinAndSelect('rolMenu.menu', 'menu', 'menu.activo')
      .where('rolMenu.perfilId = :rol and rolMenu.habilitado = true and rolMenu.activo = true', { rol: idRol })
      .select(['rolMenu.id', 'rolMenu.menuId', 'menu.id', 'menu.nombre'])
      .addSelect(['menu.descripcion', 'menu.icono', 'menu.url', 'menu.posicion'])
      .orderBy('rolMenu.id', 'ASC')
      .getMany()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
      });
    if (!lista) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  async crearRolesMenus(rolMenu: CreateRolesMenuDto): Promise<MessageResponse<any>> {
    const existeRol = await this.rolRepository.findOneBy({ id: rolMenu.perfilId, habilitado: true });
    if (!existeRol) throw new NotFoundException({ message: Message.notExists('Rol', rolMenu.perfilId), data: null });

    const existeUsuario = await this.menuRepository.findOneBy({ id: rolMenu.menuId, habilitado: true });
    if (!existeUsuario) throw new NotFoundException({ message: Message.notExists('Menu', rolMenu.menuId), data: null });

    const existe = await this.rolMenuRepository.findOne({
      where: { perfilId: rolMenu.perfilId, menuId: rolMenu.menuId, activo: true },
    });
    if (existe) throw new ConflictException({ message: MessageEnum.EXIST, data: existe });

    const nuevorolMenu = this.rolMenuRepository.create(rolMenu);
    nuevorolMenu.habilitado = true;
    await this.rolMenuRepository.save(nuevorolMenu).catch(e => {
      this.logger.log(e);
      throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE); //  data: null
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.CREATED, nuevorolMenu);
  }

  async eliminarRolesMenus(rolMenuId: number): Promise<MessageResponse<any>> {
    const rolMenuEntity = await this.rolMenuRepository.findOne({ where: { id: rolMenuId, activo: true } });
    if (!rolMenuEntity) {
      throw new NotFoundException({ message: Message.notExists('RolMenu', rolMenuId), data: null });
    }
    rolMenuEntity.activo = false;
    await this.rolMenuRepository.save(rolMenuEntity).catch(e => {
      this.logger.log(e);
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id: rolMenuId });
  }
}
