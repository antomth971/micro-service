import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class School extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare directorName: string

}
