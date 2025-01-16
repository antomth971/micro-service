import { BaseSeeder } from '@adonisjs/lucid/seeders'
import School from '#models/school'
export default class extends BaseSeeder {
  async run() {
    await School.createMany([
      {
        name: 'School 1',
        address: 'Address 1',
        directorName: 'Director 1',
      },
      {
        name: 'School 2',
        address: 'Address 2',
        directorName: 'Director 2',
      },
      {
        name: 'School 3',
        address: 'Address 3',
        directorName: 'Director 3',
      },
    ])
  }
}
