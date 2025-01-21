import { ApiProperty } from '@nestjs/swagger';
import { Estado } from 'src/estado/entities/estado.entity';
import { Rechazo } from 'src/rechazo/entities/rechazo.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Solicitud {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id_solicitud: number;

  @ApiProperty({ description: 'ID del usuario oferente', example: 1 })
  @Column({ type: 'int', nullable: false })
  oferente_id: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({
    name: 'oferente_id',
    referencedColumnName: 'id_usuario',
  })
  oferente: Usuario;

  @ApiProperty({ description: 'ID del usuario buscador', example: 1 })
  @Column({ type: 'int', nullable: false })
  buscador_id: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({
    name: 'buscador_id',
    referencedColumnName: 'id_usuario',
  })
  buscador: Usuario;

  @ApiProperty({ description: 'ID del servicio', example: 1 })
  @Column({ type: 'int', nullable: false })
  servicio_id: number;

  @ManyToOne(() => Servicio, { eager: true })
  @JoinColumn({
    name: 'servicio_id',
    referencedColumnName: 'id_servicio',
  })
  servicio: Servicio;

  @ApiProperty({ description: 'Fecha de la solicitud' })
  @CreateDateColumn({ type: 'timestamp' })
  fecha_solicitud: Date;

  @ApiProperty({
    description: 'Comentario de la solicitud',
    example: 'Necesito el servicio para esta semana',
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  comentario?: string;

  @ApiProperty({ description: 'ID del estado de la solicitud', example: 1 })
  @Column({ type: 'int', nullable: false, default: 1 })
  estado_id: number;

  @ManyToOne(() => Estado, { eager: true })
  @JoinColumn({
    name: 'estado_id',
    referencedColumnName: 'id_estado',
  })
  estado: Estado;

  @ApiProperty({ description: 'ID del motivo de rechazo', example: 1 })
  @Column({ type: 'int', nullable: true })
  rechazo_motivo_id?: number;

  @ManyToOne(() => Rechazo, { eager: true })
  @JoinColumn({
    name: 'rechazo_motivo_id',
    referencedColumnName: 'id_rechazo',
  })
  rechazo: Rechazo;

  @ApiProperty({
    description: 'Estado de finalización',
    enum: ['finalizado', 'cancelado'],
  })
  @Column({ type: 'enum', enum: ['finalizado', 'cancelado'], nullable: true })
  estado_final: 'finalizado' | 'cancelado';

  @ApiProperty({
    description: 'Comentario de cierre',
    example: 'Problemas personales - No puedo continuar con el servicio',
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  motivo_cierre?: string;

  @ApiProperty({ description: 'Fecha de cierre de la solicitud' })
  @Column({ type: 'timestamp', nullable: true })
  fecha_cierra: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'Fecha de eliminación del registro' })
  @DeleteDateColumn()
  deletedAt?: Date;
}
