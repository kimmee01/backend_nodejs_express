import { Router } from 'express'
import jwt from 'jsonwebtoken'
// import checkJwt from '../middleware/check-jwt.js'
import * as AuthCtrl from '../ctrl/auth-ctrl.js'

const router = Router()

export default router

router.post('/signin', async(req, res) => {
  try {
    const xxx = await AuthCtrl.signIn(req, req.body)
    res.send({
      ok: 1,
      xxx
    })
  } catch (err) {
    res.send({ ok: 0, error: err.message })
  }
})