import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
//import { Roles } from '../roles/entities/roles.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id_usuario: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  // @ManyToOne(() => Roles)
  // @JoinColumn({ name: 'role_id' })
  // role: Roles;

  //@Column({ name: 'role_id' })
  @Column({ type: 'int', nullable: false })
  role_id: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  domicilio_laboral: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  domicilio_particular: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

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
