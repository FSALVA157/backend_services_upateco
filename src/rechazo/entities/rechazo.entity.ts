import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rechazo {
  @ApiProperty({ description: 'Identificador unico de rechazo' })
  @PrimaryGeneratedColumn()
  id_rechazo: number;

  @ApiProperty({
    description: 'texto del motivo de rechazo',
    example: 'No se puede realizar el servicio',
  })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  rechazo_motivo: string;
}
