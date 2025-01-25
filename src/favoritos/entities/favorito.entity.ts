import { ApiProperty } from '@nestjs/swagger';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favorito {
  @ApiProperty({ description: 'Identificador único del favorito' })
  @PrimaryGeneratedColumn()
  id_favorito: number;

  @ApiProperty({ description: 'ID del usuario que elije un servicio favorito' })
  @Column({ type: 'int', nullable: false })
  usuario_id: number;

  @ApiProperty({ description: 'usuario asociado a este registro de favorito' })
  @ManyToOne(() => Usuario)
  @JoinColumn({
    name: 'usuario_id',
    referencedColumnName: 'id_usuario',
  })
  usuario: Usuario;

  @ApiProperty({ description: 'ID del servicio elegido como favorito' })
  @Column({ type: 'int', nullable: false })
  servicio_id: number;

  @ApiProperty({ description: 'servicio asociado a este registro de favorito' })
  @ManyToOne(() => Servicio)
  @JoinColumn({
    name: 'servicio_id',
    referencedColumnName: 'id_servicio',
  })
  servicio: Servicio;

  @ApiProperty({ description: 'Fecha en que se marcó como favorito' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_favorito: Date;
}
