import { NextRequest, NextResponse } from 'next/server'
import { getPlants } from '@/lib/plants'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const nativeRegion = searchParams.get('nativeRegion') || undefined
  const sunRequirement = searchParams.get('sun') || undefined
  const wildlife = searchParams.get('wildlife') || undefined

  const plants = await getPlants({
    nativeRegion,
    sunRequirement,
    wildlifeValue: wildlife === 'all' ? undefined : wildlife,
  })

  return NextResponse.json(plants)
}
