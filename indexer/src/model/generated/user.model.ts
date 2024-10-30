import {
  Column as Column_,
  Entity as Entity_,
  OneToMany as OneToMany_,
  PrimaryColumn as PrimaryColumn_,
} from 'typeorm';
import { Solution } from './solution.model';

@Entity_()
export class User {
  constructor(props?: Partial<User>) {
    Object.assign(this, props);
  }

  /**
   * Account address
   */
  @PrimaryColumn_()
  id!: string;

  @Column_('int4', { nullable: false, default: 0 })
  totalSolved!: number;

  @OneToMany_(() => Solution, (e) => e.player)
  solutions!: Solution[];
}
