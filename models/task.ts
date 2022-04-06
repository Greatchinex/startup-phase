import { ObjectType, Field } from 'type-graphql'

/* **
 * NOTE: Typically this file will use an ORM(e.g typeOrm for sql or typegoose for mongo DB) And a single class will serve
 * as the database model, graphql schema and typesript interface. but since data is not stored to a DB this will just double
 * down as the graphql schema and typescript type for the model
 *
 *
 */
@ObjectType({ description: 'Schema for tasks for a single phase' })
export class taskSchema {
  @Field()
  uuid: string

  @Field()
  name: string

  @Field()
  completed: boolean
}
