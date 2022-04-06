import { Resolver, Mutation, Arg } from 'type-graphql'

import { ResStatus } from '../schema/generic'

import { PhaseService } from '../../services/phase.service'

const phaseService = new PhaseService()

@Resolver()
export class PhaseReslover {
  @Mutation(() => ResStatus, { description: 'Create a startup phase' })
  create_phase(@Arg('name') name: string): ResStatus {
    try {
      const resPayload = phaseService.create_phase(name)

      return resPayload
    } catch (error) {
      console.log('Could not create a phase', `Error message: ${error.message ?? 'N/A'}`)
      return error
    }
  }

  @Mutation(() => ResStatus, { description: 'Create a task for a phase' })
  add_phase_task(@Arg('name') name: string, @Arg('phaseId') phaseId: string): ResStatus {
    try {
      const resPayload = phaseService.add_phase_task(name, phaseId)

      return resPayload
    } catch (error) {
      console.log(
        `Could not create task for phase ==> ${phaseId}`,
        `Error message: ${error.message ?? 'N/A'}`
      )
      return error
    }
  }
}
