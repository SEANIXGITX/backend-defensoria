export class UsuarioTokenDto {
  usuarioId: number;
  roles: Array<number>;
  oficinaId: number;
  tokenId: string;
  fechaExpiracion: number;
}
