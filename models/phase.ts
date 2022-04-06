import { ObjectType, Field, Int } from 'type-graphql'

import { taskSchema } from './task'

/* **
 * NOTE: Typically this file will use an ORM(e.g typeOrm for sql or typegoose for mongo DB) And a single class will serve
 * as the database model, graphql schema and typesript interface. but since data is not stored to a DB this will just double
 * down as the graphql schema and typescript type for the model
 *
 *
 */
@ObjectType({ description: 'Schema for startup phase' })
export class phaseSchema {
  @Field()
  uuid: string

  @Field()
  name: string

  @Field(() => Int)
  number: number

  @Field(() => [taskSchema], { nullable: true })
  tasks: Array<taskSchema>
}
