import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UsuarioRolEntity } from 'src/autorizacion/rol/entities/usuario-rol.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuditoriaEntity } from '../../../shared/entities/auditoria.entity';

@Unique(['nombre'])
@Entity('usuarios', { schema: 'autorizacion' })
export class UsuarioEntity extends AuditoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'tthh_usuario_id', length: 60 })
  tthhUsuarioId: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  nombre: string;

  @Column({ select: false }) clave: string;

  @Column({ type: 'varchar', name: 'token', select: false })
  token: string;

  @Column({ name: 'refresh_token', select: false })
  refreshToken: string;

  @Column() habilitado: boolean;

  //@Column({ type: 'varchar', name: 'id_persona', nullable: false })
  //idPersona: string;

  @OneToMany(() => UsuarioRolEntity, ur => ur.usuario)
  rolesUsuario: UsuarioRolEntity[];

  constructor(data: Partial<UsuarioEntity> = {}) {
    super();
    Object.assign(this, data);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    if (this.clave && !/^\$2a\$\d+\$/.test(this.clave)) {
      this.clave = await bcrypt.hash(this.clave, salt);
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.clave);
  }

  @Exclude()
  roles: string[];
}
