import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entities/role.entity';
import { Favorito } from 'src/favoritos/entities/favorito.entity';
//import { Roles } from '../roles/entities/roles.entity';

@Entity()
export class Usuario {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id_usuario: number;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@email.com',
  })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @ApiProperty({
    description: 'ID del rol del usuario: 1-oferente, 2-buscador, 3-ambos',
    example: 1,
  })
  @Column({ type: 'int', nullable: false, default: 2 })
  role_id: number;

  //le permito nullable porque al inicio podría no estar llenada la tabla de roles
  @ManyToOne(() => Role, { eager: true, nullable: true })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id_role',
  })
  rol?: Role;

  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '1234567890',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @ApiProperty({
    description: 'Domicilio laboral del usuario',
    example: 'Calle 123',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 200, nullable: true })
  domicilio_laboral?: string;

  @ApiProperty({
    description: 'Domicilio particular del usuario',
    example: 'Avenida 456',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 200, nullable: true })
  domicilio_particular?: string;

  @OneToMany(() => Favorito, (favorito) => favorito.usuario, {
    eager: true,
    cascade: true,
  })
  favoritos: Favorito[];

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

  @ApiProperty({
    description: 'Fecha de eliminación del registro',
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
