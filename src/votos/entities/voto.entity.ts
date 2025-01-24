import { ApiProperty } from '@nestjs/swagger';
import { Solicitud } from 'src/solicitudes/entities/solicitud.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Voto {
  @ApiProperty({ description: 'Identificador único del voto' })
  @PrimaryGeneratedColumn()
  id_voto: number;

  @ApiProperty({ description: 'ID de la solicitud asociada' })
  @Column({ type: 'int', nullable: false, unique: true })
  solicitud_id: number;

  @ApiProperty({ description: 'ID del oferente que emite el voto' })
  @Column({ type: 'int', nullable: false })
  oferente_id: number;

  @OneToOne(() => Solicitud, { eager: true })
  @JoinColumn({
    name: 'solicitud_id',
    referencedColumnName: 'id_solicitud',
  })
  solicitud: Solicitud;

  @ApiProperty({
    description: 'Valor del voto',
    example: 'solo se puede una vez y puede ser 1 a 5',
    minimum: 1,
    maximum: 5,
  })
  @Column({ type: 'int', nullable: false, default: 1 })
  voto: number;

  @ApiProperty({ description: 'Comentario opcional del voto' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  comentario?: string;
}
