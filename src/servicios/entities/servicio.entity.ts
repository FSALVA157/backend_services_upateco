import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Servicio {
  @ApiProperty({ description: 'ID del servicio', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id_servicio: number;

  @ApiProperty({
    description: 'Id del Usuario Autor',
    example: 10,
  })
  @Column({ type: 'int', nullable: false })
  usuario_id: number;

  @ApiProperty({
    description: 'Título del servicio',
    example: 'Servicio de limpieza',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  titulo: string;

  @ApiProperty({
    description: 'Descripción del servicio',
    example: 'Servicio completo de limpieza del hogar',
  })
  @Column({ type: 'varchar', length: 500, nullable: false })
  descripcion: string;

  @ApiProperty({ description: 'ID de la categoría', example: 1 })
  @Column({ type: 'int', nullable: false })
  categoria_id: number;

  @ApiProperty({
    description: 'Duración en minutos horas o días',
    example: '6 días, 5 horas',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  duracion: string;

  @ApiProperty({
    description: 'Horario disponible',
    example: 'Lunes a Viernes 9:00-18:00',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  horario: string;

  @ApiProperty({
    description: 'Estado del servicio(false: en pausa, true: activo)',
    example: true,
  })
  @Column({ type: 'boolean', default: true, nullable: true })
  estado?: boolean;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Fecha de eliminación del registro',
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt?: Date;
}
