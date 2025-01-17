import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty({ description: 'The unique identifier of the role' })
  @PrimaryGeneratedColumn()
  id_role: number;

  @ApiProperty({
    description: 'nombre del role: oferente-buscador-ambos',
    example: 'oferente',
  })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  rol: string;
}
