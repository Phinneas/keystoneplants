export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
