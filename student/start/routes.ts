/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
const StudentsController = () => import('#controllers/students_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/students', [StudentsController,'index'])
router.get('/students/:id', [StudentsController,'show'])
router.get('/students/insert/:name/:genre/:SchoolId', [StudentsController,'insert'])
router.get('/students/update/:id', [StudentsController,'update'])
router.get('/students/delete/:id', [StudentsController,'delete'])
router.get('/info', async ({ response } : HttpContext) => {
  response.json({
    status: 'UP',
    app: 'STUDENT',
    timestamp: new Date().toISOString(),
  });
});
router.get('/health', async ({ response } : HttpContext) => {
  response.json({
    status: 'UP',
  });
})
