import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

class AddInfo {
  @ApiProperty()
  habilitado: boolean;
}
class UpdatemDTO extends IntersectionType(CreateMenuDto, AddInfo) {}

export class UpdateMenuDto extends PartialType(UpdatemDTO) {}
