// Generic types..
import { ObjectType, Field } from 'type-graphql'

@ObjectType({ description: 'Generic status response' })
export class ResStatus {
  @Field()
  message: string

  @Field()
  success: boolean
}
