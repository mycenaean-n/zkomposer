import {
  Column as Column_,
  Entity as Entity_,
  Index as Index_,
  PrimaryColumn as PrimaryColumn_,
} from 'typeorm';
import * as marshal from './marshal';

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
  @Column_('text', { nullable: true })
  player!: string | undefined | null;

  @Column_('numeric', {
    transformer: marshal.bigintTransformer,
    nullable: false,
  })
  blockNumber!: bigint;
}
