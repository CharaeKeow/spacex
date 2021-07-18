import { requireSession } from '@clerk/clerk-sdk-node'

export default function handler(req, res) {
  res.statusCode = 200
  res.json({ id: req.sesion.userId })
}
