import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';
import { Repository } from 'typeorm';
import { UsuarioRolEntity } from '../rol/entities/usuario-rol.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { RolMenuEntity } from './entities/rol-menu.entity';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
    @InjectRepository(RolMenuEntity) private rolMenuRepository: Repository<RolMenuEntity>,
    @InjectRepository(UsuarioRolEntity) private usuRolRepo: Repository<UsuarioRolEntity>,
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async obtenerMenus(): Promise<MessageResponse<MenuEntity[]>> {
    const menus = await this.menuRepository
      .find({ where: { activo: true }, order: { id: 'DESC' }, select: MenuEntity.allFields() })
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.UNPROCESSABLE);
      });
    if (menus.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, menus);
  }

  async crearMenu(createMenuDto: CreateMenuDto): Promise<MessageResponse<MenuEntity>> {
    const existe = await this.menuRepository.findOne({
      where: { nombre: createMenuDto.nombre.trim(), activo: true },
    });

    if (existe) throw new ConflictException({ message: MessageEnum.EXIST, data: existe });
    const nuevoMenu = this.menuRepository.create(createMenuDto);
    nuevoMenu.icono = createMenuDto.icono == null ? '' : createMenuDto.icono;
    !nuevoMenu.padreId && (nuevoMenu.padreId = 0);
    nuevoMenu.habilitado = true;
    await this.menuRepository.save(nuevoMenu).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_CREATE);
    });

    return new MessageResponse(HttpStatus.CREATED, MessageEnum.CREATED, nuevoMenu);
  }

  async actualizarMenu(id: number, modMenuDto: UpdateMenuDto): Promise<MessageResponse<MenuEntity>> {
    const menuActualizar = await this.menuRepository.findOne({ where: { id } });
    if (!menuActualizar) {
      throw new NotFoundException({ message: Message.notExists('Menu', id), data: null });
    }
    !menuActualizar.padreId && (menuActualizar.padreId = 0);
    const cambios = this.menuRepository.create(modMenuDto);
    this.menuRepository.merge(menuActualizar, cambios);
    await this.menuRepository.save(menuActualizar).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });
    const listar = await this.menuRepository.findOne({ where: { id } });
    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, listar);
  }

  async eliminarMenu(id: number): Promise<MessageResponse<{ id: number }>> {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });
    }
    await this.menuRepository.update(id, { activo: false }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
    });
    const rolMenus = await this.rolMenuRepository.find({ where: { menuId: menu.id } });
    rolMenus.forEach(async rolMenu => {
      rolMenu.activo = false;
      await this.rolMenuRepository.save(rolMenu).catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
      });
    });
    return new MessageResponse(HttpStatus.OK, MessageEnum.DELETED, { id });
  }

  /**
   * listado de menus de un usuario, por jerarquia.
   * El atributo idPadre de la entity menu establece la dependencia de cada menu
   * @param idUsuario integer, identificador de usuario
   * @returns objMenu, objetos(nombre, url) de la entity menu, representan los menus con sus submenus
   * returns repuestaHTML string, menus con submenus en formato html
   */
  async menuJerarquicoPorUsuario(idUsuario: number): Promise<MessageResponse<any>> {
    const cargarmenu = (id: number) => {
      let menus = [];
      menus = todoMenu.filter(element => element.padreId == id);
      for (let fila of menus) {
        const nombre = fila['nombre'];
        const url = fila['url'];
        const menus2 = todoMenu.filter(element => element.padreId == fila['id']);
        const fila2 = menus2[0];
        if (fila2) {
          respuestaJSON +=
            '{"nombre" :"' +
            nombre +
            '", "icono" : "' +
            fila['icono'] +
            '" , "url" : "' +
            url +
            '" , "posicion" : ' +
            fila['posicion'] +
            ' ,"submenu":[';
          respuestaHTML += "<li><a href='" + url + "'>" + nombre + '</a><ul>';
          cargarmenu(fila['id']);
          respuestaJSON += ']},';
          respuestaHTML += '</ul></li>';
        } else {
          respuestaHTML += "<li><a href='" + url + "'>" + fila['nombre'] + '</a></li>';
          respuestaJSON +=
            '{"nombre" :"' +
            nombre +
            '", "icono" : "' +
            fila['icono'] +
            '" , "url" : "' +
            url +
            '" , "posicion" : ' +
            fila['posicion'] +
            '},';
        }
      }
    };

    let respuestaJSON: string;
    let respuestaHTML: string;
    respuestaHTML = '<ul>';
    respuestaJSON = '[';

    let todoMenu = [];
    const aux = await this.listarPorIdUsuario(idUsuario); // ver data = []
    todoMenu = aux.data;

    cargarmenu(0);
    respuestaJSON += ']';

    respuestaJSON = respuestaJSON.replace(/},]/g, '}]');
    const objMenu = JSON.parse(respuestaJSON);

    respuestaHTML += '</ul>';
    return new MessageResponse(HttpStatus.OK, MessageEnum.UPDATED, objMenu);
  }

  async listarPorIdUsuario(idUsuario: number): Promise<MessageResponse<MenuEntity[]>> {
    const usuario = await this.usuarioRepository.findOneBy({ id: idUsuario });
    if (!usuario) {
      throw new NotFoundException({ message: Message.idNotExists({ id: idUsuario }), data: null });
    }
    const usuariosRoles = await this.usuRolRepo
      .createQueryBuilder('usrRol')
      .leftJoinAndSelect('usrRol.rol', 'rol')
      .leftJoinAndMapMany('rol.menusRol', 'perfiles_menu', 'rm', 'rm.perfilId = rol.id')
      .leftJoinAndSelect('rm.menu', 'menu')
      .where('usrRol.usuarioId = :idUsuario ', { idUsuario })
      .andWhere('rm.habilitado = true and rm.activo = true')
      .select(['usrRol.id', 'usrRol.perfilId', 'rol.id', 'rol.nombre', 'rol.codigo', 'rol.descripcion'])
      .addSelect(['rm.id', 'rm.perfilId', 'rm.menuId'])
      .addSelect(['menu.id', 'menu.nombre', 'menu.descripcion', 'menu.icono', 'menu.url', 'menu.posicion', 'menu.padreId'])
      .orderBy('menu.posicion', 'ASC')
      .getMany()
      .catch(e => {
        throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_DELETE);
      });
    let todoMenu: any = [];
    usuariosRoles.forEach(elemento => {
      return elemento.rol.menusRol.forEach(rolmenu => todoMenu.push(rolmenu.menu));
    });

    const unicos = new Set(todoMenu.map(elementAt => JSON.stringify(elementAt)));
    todoMenu = Array.from(unicos).map(ele => JSON.parse(ele as string));
    todoMenu.sort((a, b) => {
      if (a.posicion == b.posicion) {
        return 0;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      return 1;
    });

    if (todoMenu.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, todoMenu);
  }

  async enable(id: number): Promise<MessageResponse<{ id: number; habilitado: boolean }>> {
    const menu = await this.menuRepository.findOne({ where: { id, activo: true } });
    if (!menu) throw new NotFoundException({ message: MessageEnum.NOT_EXIST, data: null });

    menu.habilitado = !menu.habilitado;
    await this.menuRepository.update(id, { habilitado: menu.habilitado }).catch(e => {
      throw new UnprocessableEntityException(e.message, MessageEnum.ERROR_UPDATE);
    });

    return new MessageResponse(HttpStatus.OK, MessageEnum.ENABLED, { id: menu.id, habilitado: menu.habilitado });
  }
}
