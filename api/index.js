import { Router } from 'express'
import AuthRouter  from './auth.js'

// import checkJwt from '../middleware/check-jwt.js'

const router = Router()


router.get('/',async (req, res) => {
 let users =  await req.db('users')
  res.send(users)
})

router.use('/auth', AuthRouter)

export default router
