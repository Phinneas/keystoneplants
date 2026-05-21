import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const NEW_PASSWORD = process.env.NEW_PASSWORD
if (!NEW_PASSWORD) {
  console.error('Usage: NEW_PASSWORD=yourpassword npm run reset-password')
  process.exit(1)
}

async function resetPassword() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({ collection: 'users', limit: 1 })
  if (!docs[0]) {
    console.error('No users found')
    process.exit(1)
  }
  await payload.update({
    collection: 'users',
    id: docs[0].id,
    data: { password: NEW_PASSWORD },
  })
  console.log(`Password reset for ${docs[0].email}`)
  process.exit(0)
}

resetPassword()
