import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Categoria {
  @ApiProperty({ description: 'Identificador unico de categoría' })
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @ApiProperty({
    description: 'nombre de la categoría',
    example: 'limpieza, plomería, electricidad',
  })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  categoria: string;
}
