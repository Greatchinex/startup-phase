import { ResStatus } from '../graphql/schema/generic'
import { phaseSchema } from '../models/phase'

import { DbMethods } from '../helpers/db'

const dbMethods = new DbMethods()

export class PhaseService {
  // Create a new startup phase
  public create_phase(phaseName: string): ResStatus {
    const parseDB = dbMethods.getDB()

    const phaseNumber = parseDB.length + 1

    const newPhase = {
      uuid: Math.round(Math.random() * 36 ** 12).toString(36),
      name: phaseName,
      number: phaseNumber,
      tasks: []
    }

    parseDB.push(newPhase)

    dbMethods.saveToDB(parseDB)

    return {
      message: 'New phase added successfully',
      success: true
    }
  }

  // Add a task to a startup phase
  public add_phase_task(taskName: string, phaseId: string): ResStatus {
    const parseDB = dbMethods.getDB()

    const findPhase = parseDB.find((p: any) => p.uuid === phaseId)

    if (!findPhase) {
      return {
        message: 'Phase not found, Could not create task',
        success: false
      }
    }

    const newTask = {
      uuid: Math.round(Math.random() * 36 ** 12).toString(36),
      name: taskName,
      completed: false
    }

    findPhase.tasks.push(newTask)

    dbMethods.saveToDB(parseDB)

    return {
      message: 'Task created successfully',
      success: true
    }
  }

  // Fetch all phase and tasks attached to the phase
  public my_phases(): Array<phaseSchema> {
    const parseDB = dbMethods.getDB()

    return parseDB
  }

  // Mark a task as completed
  public complete_task(taskId: string, phaseId: string) {
    const parseDB = dbMethods.getDB()

    const findPhase = parseDB.find((p: any) => p.uuid === phaseId)

    if (!findPhase) {
      return {
        message: 'Phase not found, Could not mark task as completed',
        success: false
      }
    }

    // Check if last phase has been completed
    const lastPhaseNumber = findPhase.number - 1
    const previousPhase = parseDB.find((p: any) => p.number === lastPhaseNumber)

    if (previousPhase) {
      // Make sure all tasks are completed for previous phase
      const previousPhaseTasks = previousPhase.tasks.find((t: any) => t.completed === false)

      if (previousPhaseTasks) {
        return {
          message: 'Please complete all tasks from the previous phase',
          success: false
        }
      }
    }

    const findTask = findPhase.tasks.find((t: any) => t.uuid === taskId)

    if (!findTask) {
      return {
        message: 'Task not found, Could not mark task as completed',
        success: false
      }
    }

    findTask.completed = true

    dbMethods.saveToDB(parseDB)

    return {
      message: 'Task marked as completed',
      success: true
    }
  }
}
