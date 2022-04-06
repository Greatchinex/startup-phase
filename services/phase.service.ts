import fs from 'fs'
import { join } from 'path'

import { ResStatus } from '../graphql/schema/generic'
import { phaseSchema } from '../models/phase'

export class PhaseService {
  // Create a new startup phase
  public create_phase(phaseName: string): ResStatus {
    const getDB = fs.readFileSync(join(__dirname, '../../db.json'), 'utf-8')
    const parseDB = JSON.parse(getDB.toString())

    const phaseNumber = parseDB.length + 1

    const newPhase = {
      uuid: Math.round(Math.random() * 36 ** 12).toString(36),
      name: phaseName,
      number: phaseNumber,
      tasks: []
    }

    parseDB.push(newPhase)

    fs.writeFileSync(join(__dirname, '../../db.json'), JSON.stringify(parseDB, null, 2))

    return {
      message: 'New phase added successfully',
      success: true
    }
  }

  // Add a task to a startup phase
  public add_phase_task(taskName: string, phaseId: string): ResStatus {
    const getDB = fs.readFileSync(join(__dirname, '../../db.json'), 'utf-8')
    const parseDB = JSON.parse(getDB.toString())

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

    fs.writeFileSync(join(__dirname, '../../db.json'), JSON.stringify(parseDB, null, 2))

    return {
      message: 'Task created successfully',
      success: true
    }
  }

  // Fetch all phase and tasks attached to the phase
  public my_phases(): Array<phaseSchema> {
    const getDB = fs.readFileSync(join(__dirname, '../../db.json'), 'utf-8')
    const parseDB = JSON.parse(getDB.toString())

    return parseDB
  }

  // Mark a task as completed
  public complete_task(taskId: string, phaseId: string) {
    const getDB = fs.readFileSync(join(__dirname, '../../db.json'), 'utf-8')
    const parseDB = JSON.parse(getDB.toString())

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

    fs.writeFileSync(join(__dirname, '../../db.json'), JSON.stringify(parseDB, null, 2))

    return {
      message: 'Task marked as completed',
      success: true
    }
  }
}
