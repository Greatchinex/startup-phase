import { Resolver, Mutation, Arg, Query } from 'type-graphql'

import { phaseSchema } from '../../models/phase'
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
      console.log('Phase: Could not create a phase', `Error message: ${error.message ?? 'N/A'}`)
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
        `Phase: Could not create task for phase ==> ${phaseId}`,
        `Error message: ${error.message ?? 'N/A'}`
      )
      return error
    }
  }

  @Query(() => [phaseSchema], { description: 'Fetch phases along with task' })
  my_phases(): Array<phaseSchema> {
    try {
      return phaseService.my_phases()
    } catch (error) {
      console.log('Phase: Error fetching Phase', `Error message: ${error.message ?? 'N/A'}`)
      return error
    }
  }

  @Mutation(() => ResStatus, { description: 'Mark a task as completed' })
  complete_task(@Arg('taskId') taskId: string, @Arg('phaseId') phaseId: string): ResStatus {
    try {
      const resPayload = phaseService.complete_task(taskId, phaseId)

      return resPayload
    } catch (error) {
      console.log(
        'Phase: Failed to mark task as complete',
        `TaskId ==> ${taskId}, PhaseId ==> ${phaseId}`,
        `Error message: ${error.message ?? 'N/A'}`
      )
      return error
    }
  }
}
