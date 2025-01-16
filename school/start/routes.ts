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
const SchoolsController = () => import("#controllers/schools_controller")
router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.get('/schools', [SchoolsController,"index"])
router.post('/schools/:name/:address/:directorName', [SchoolsController,"store"])
router.get('/schools/:id', [SchoolsController,"show"])
router.put('/schools/:id/:name/:address/:directorName', [SchoolsController,"update"])
router.delete('/schools/:id', [SchoolsController,"destroy"])
router.get('/info', async ({ response } : HttpContext) => {
  response.json({
    status: 'UP',
    app: 'SCHOOL',
    timestamp: new Date().toISOString(),
  });
});
router.get('/health', async ({ response } : HttpContext) => {
  response.json({
    status: 'UP',
  });
})
