import type { HttpContext } from '@adonisjs/core/http'
import School from '#models/school'
export default class SchoolsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return School.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params }: HttpContext) {
    const { name, address, directorName } = params.all()
    return School.create({ name, address, directorName })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return School.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params }: HttpContext) {
    const { name, address, directorName } = params.all()
    const school = await School.findOrFail(params.id)
    school.merge({ name, address, directorName })
    return school.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const school = await School.findOrFail(params.id)
    await school.delete()
    return 'Record deleted successfully '+params.id
  }
}
