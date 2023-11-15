import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { MessageResponse } from 'src/shared/entities/message-response';
import { MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class ProductoService {
  constructor(@InjectRepository(ProductoEntity) private productoRepository: Repository<ProductoEntity>) {}

  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all producto`;
  }

  async listaPorProyecto(idProyecto: number) {
    const lista = await this.productoRepository.find({ where: { proyectoId: idProyecto, activo: true }, order: { descripcion: 'DESC' } });
    const message = lista.length > 0 ? MessageEnum.ENTITY_SELECT : MessageEnum.ENTITY_SELECT_EMPTY;
    return new MessageResponse(HttpStatus.OK, message, lista);
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
