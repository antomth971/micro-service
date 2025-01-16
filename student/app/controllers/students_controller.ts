import type { HttpContext } from '@adonisjs/core/http'
import student from '#models/student'
import MongooseProvider from "#providers/MongooseProvider"
import axios from "axios"
import EurekaService from "#services/eureka_service"
const mongooseProvider = new MongooseProvider()
mongooseProvider.boot()

export default class StudentsController {

  public async index({ response }: HttpContext) {
    const students = await student.find();
    const eurekaClient = new EurekaService("STUDENT", 3336);
    await eurekaClient.start();
    await new Promise(f => setTimeout(f, 1000));
    const schoolServiceInstance = eurekaClient.client.getInstancesByAppId("SCHOOL");
    eurekaClient.client.stop();

    if (!schoolServiceInstance || schoolServiceInstance.length === 0) {
      console.error('Aucune instance trouvée pour SCHOOL');
      return response.status(500).send('Le service School est indisponible');
    }


    const schoolBaseUrl = `http://${schoolServiceInstance[0].hostName}:${schoolServiceInstance[0].port.$}`;

    const promises = students.map(async (student) => {
      const schoolResponse = await axios.get(`${schoolBaseUrl}/schools/${student.SchoolId}`);
      const school = schoolResponse.data;
      return { student, school };
    });

    const studentsWithSchool = await Promise.all(promises);

    response.json(studentsWithSchool);
  }
  public async show({ response, request }: HttpContext) {
    const { id } = request.params()
    const studentFound = await student.findOne({ _id: id })
    if (!studentFound) {
      return response.status(404).send('Student not found with this id')
    }
    const schoolResponse = await axios.get(`http://localhost:59452/schools/${studentFound.SchoolId}`);
    const school = schoolResponse.data;

    response.json({ student: studentFound, school })
  }
  public async insert({ response, request }: HttpContext) {
    let { name, genre, SchoolId } = request.params()
    if (!name || !genre || !SchoolId) {
      return response.status(400).send('Missing required fields')
    }
    name = name.toString()
    genre = (genre === 'true') ? true : false
    SchoolId = parseInt(SchoolId)

    const newStudent = await student.create({ name, genre, SchoolId })

    response.send('Student created' + newStudent)
  }
  public async update({ response, request }: HttpContext) {
    const { id } = request.params()
    let { name, genre, SchoolId } = request.params()
    await student.updateMany({ _id: id }, { name, genre, SchoolId })
    response.send('Student updated')
  }
  public async delete({ response, request }: HttpContext) {
    const { id } = request.params()
    await student.deleteMany({ _id: id })
    response.send('Student deleted')
  }
}
