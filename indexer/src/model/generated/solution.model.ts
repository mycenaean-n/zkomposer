import {
  Column as Column_,
  Entity as Entity_,
  Index as Index_,
  ManyToOne as ManyToOne_,
  PrimaryColumn as PrimaryColumn_,
} from 'typeorm';
import * as marshal from './marshal';
import { User } from './user.model';

@Entity_()
export class Solution {
  constructor(props?: Partial<Solution>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Index_()
  @Column_('text', { nullable: false })
  puzzleSet!: string;

  @Index_()
  @Column_('text', { nullable: false })
  puzzleId!: string;

  @Index_()
  @ManyToOne_(() => User, { nullable: true })
  player!: User;

  @Column_('numeric', {
    transformer: marshal.bigintTransformer,
    nullable: false,
  })
  blockNumber!: bigint;
}
