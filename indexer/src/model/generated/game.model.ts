import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Game {
    constructor(props?: Partial<Game>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    puzzleSet!: string

    @Column_("int4", {nullable: false})
    interval!: number

    @Column_("int4", {nullable: false})
    numberOfRounds!: number

    @Column_("int4", {nullable: false})
    startingBlock!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    stake!: bigint
}
