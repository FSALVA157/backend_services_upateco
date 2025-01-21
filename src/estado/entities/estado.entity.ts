import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estado {
  @ApiProperty({ description: 'Identificador unico de estado' })
  @PrimaryGeneratedColumn()
  id_estado: number;

  @ApiProperty({
    description: 'nombre del estado',
    example: 'Tres valores posibles: aceptado, rechazado, pendiente',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  estado: string;
}
