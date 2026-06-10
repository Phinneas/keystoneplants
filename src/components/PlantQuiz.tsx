'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ECOREGION_GROUP_META, type EcoregionGroup } from '@/lib/ecoregions'
import type { ParsedPlant } from '@/lib/plants'

type Step = 1 | 2 | 3 | 4

interface Answers {
  group: EcoregionGroup | null
  sun: string | null
  wildlife: string | null
}

const SUN_OPTIONS = [
  {
    value: 'full-sun',
    label: 'Full Sun',
    desc: '6+ hours of direct sunlight per day',
  },
  {
    value: 'part-shade',
    label: 'Part Shade',
    desc: '3–6 hours of sun, some afternoon shade',
  },
  {
    value: 'full-shade',
    label: 'Full Shade',
    desc: 'Fewer than 3 hours of direct sun',
  },
]

const WILDLIFE_OPTIONS = [
  {
    value: 'caterpillar-host',
    label: 'Butterflies & Moths',
    desc: 'Host plants that caterpillars depend on to complete their life cycle',
  },
  {
    value: 'pollinator-plant',
    label: 'Bees & Pollinators',
    desc: 'Specialist native bee forage plants — the ones bees evolved alongside',
  },
  {
    value: 'bird-food',
    label: 'Birds',
    desc: 'Seed, fruit, and insect-rich plants that support nesting birds',
  },
  {
    value: 'all',
    label: 'All of the above',
    desc: 'Show me plants that do the most for the widest range of wildlife',
  },
]

function ProgressBar({ step }: { step: Step }) {
  if (step === 4) return null
  const labels = ['Your Region', 'Sun Exposure', 'Wildlife Goal']
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((label, i) => {
        const num = (i + 1) as 1 | 2 | 3
        const active = step === num
        const done = step > num
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div className={`h-px w-8 ${done ? 'bg-[#BF6900]' : 'bg-[#e8f5d8]'}`} />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                  ${done ? 'bg-[#BF6900] text-white' : active ? 'bg-[#3D0C11] text-white' : 'bg-[#f8fef3] border border-[#e8f5d8] text-[#6b5b5d]'}`}
              >
                {done ? '✓' : num}
              </div>
              <span className={`text-xs hidden sm:block ${active ? 'text-[#3D0C11] font-medium' : 'text-[#6b5b5d]'}`}>
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-sm border transition-all
        ${selected
          ? 'border-[#BF6900] bg-[#fef8ec] shadow-sm'
          : 'border-[#e8f5d8] bg-white hover:border-[#BF6900] hover:shadow-sm'
        }`}
    >
      {children}
    </button>
  )
}

// Inline plant result card (avoids server component import issues in client context)
function ResultCard({ plant }: { plant: ParsedPlant }) {
  const SUN_LABELS: Record<string, string> = {
    'full-sun': 'Full sun',
    'part-shade': 'Part shade',
    'full-shade': 'Full shade',
  }
  const WILDLIFE_LABELS: Record<string, string> = {
    'caterpillar-host': 'Caterpillar host',
    'pollinator-plant': 'Pollinator',
    'bird-food': 'Bird food',
    'nesting-material': 'Nesting',
    cover: 'Cover',
  }

  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group flex flex-col rounded-sm border border-[#e8f5d8] bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] bg-[#f8fef3] overflow-hidden">
        {plant.photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plant.photos[0]}
            alt={plant.commonName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#6b5b5d] text-sm">
            No photo
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-semibold text-[#3D0C11] group-hover:underline decoration-[#DDFC74] decoration-2 underline-offset-2">
            {plant.commonName}
          </h3>
          <p className="text-sm italic text-[#6b5b5d]">{plant.scientificName}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {plant.sunRequirement && (
            <span className="text-xs px-2 py-0.5 rounded-sm border bg-[#f8fef3] text-[#2d5016] border-[#e8f5d8]">
              {SUN_LABELS[plant.sunRequirement] ?? plant.sunRequirement}
            </span>
          )}
          {plant.wildlifeValue.slice(0, 2).map((w) => (
            <span
              key={w}
              className="text-xs px-2 py-0.5 rounded-sm border bg-[#DDFC74]/20 text-[#3D0C11] border-[#DDFC74]"
            >
              {WILDLIFE_LABELS[w] ?? w}
            </span>
          ))}
          {plant.heightInFeetMax !== null && (
            <span className="text-xs px-2 py-0.5 rounded-sm border bg-[#f8fef3] text-[#6b5b5d] border-[#e8f5d8]">
              {plant.heightInFeetMin ? `${plant.heightInFeetMin}–${plant.heightInFeetMax}` : `to ${plant.heightInFeetMax}`} ft
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export function PlantQuiz() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Answers>({ group: null, sun: null, wildlife: null })
  const [plants, setPlants] = useState<ParsedPlant[]>([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)

  const fetchPlants = useCallback(
    async (group: EcoregionGroup, sun: string, wildlife: string) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ nativeRegion: group.nativeRegion, sun, wildlife })
        const res = await fetch(`/api/quiz-plants?${params}`)
        const data = (await res.json()) as ParsedPlant[]
        setPlants(data)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  function selectRegion(group: EcoregionGroup) {
    setAnswers((a) => ({ ...a, group }))
    setStep(2)
  }

  function selectSun(sun: string) {
    setAnswers((a) => ({ ...a, sun }))
    setStep(3)
  }

  function selectWildlife(wildlife: string) {
    const updated = { ...answers, wildlife }
    setAnswers(updated)
    if (updated.group && updated.sun) {
      fetchPlants(updated.group, updated.sun, wildlife)
    }
    setStep(4)
  }

  function restart() {
    setStep(1)
    setAnswers({ group: null, sun: null, wildlife: null })
    setPlants([])
    setEmail('')
    setEmailSaved(false)
  }

  // ── Step 1: Region ───────────────────────────────────────────────
  if (step === 1) {
    return (
      <div>
        <ProgressBar step={1} />
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            Which region are you in?
          </h2>
          <p className="text-sm text-[#6b5b5d]">
            Native plants and the insects they support co-evolved locally. Pick the region that best
            matches your location.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ECOREGION_GROUP_META.map((group) => (
            <button
              key={group.slug}
              onClick={() => selectRegion(group)}
              className="text-left px-5 py-4 rounded-sm border border-[#e8f5d8] bg-white hover:border-[#BF6900] hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-[#3D0C11] group-hover:text-[#BF6900] transition-colors font-[var(--font-figtree)]">
                {group.name}
              </p>
              <p className="text-xs text-[#6b5b5d] mt-0.5">{group.states}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Step 2: Sun ──────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div>
        <ProgressBar step={2} />
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            How much sun does your planting area get?
          </h2>
          <p className="text-sm text-[#6b5b5d]">
            Measure on a typical summer day — sun exposure shapes what plants can thrive where.
          </p>
        </div>
        <div className="flex flex-col gap-3 max-w-lg">
          {SUN_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={answers.sun === opt.value}
              onClick={() => selectSun(opt.value)}
            >
              <p className="font-semibold text-[#3D0C11]">{opt.label}</p>
              <p className="text-sm text-[#6b5b5d] mt-0.5">{opt.desc}</p>
            </OptionCard>
          ))}
        </div>
        <button
          onClick={() => setStep(1)}
          className="mt-6 text-sm text-[#6b5b5d] hover:text-[#3D0C11] transition-colors"
        >
          ← Back
        </button>
      </div>
    )
  }

  // ── Step 3: Wildlife ─────────────────────────────────────────────
  if (step === 3) {
    return (
      <div>
        <ProgressBar step={3} />
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            What wildlife do you most want to support?
          </h2>
          <p className="text-sm text-[#6b5b5d]">
            Keystone plants serve multiple roles — choose your top priority and we&rsquo;ll weight
            the results accordingly.
          </p>
        </div>
        <div className="flex flex-col gap-3 max-w-lg">
          {WILDLIFE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={answers.wildlife === opt.value}
              onClick={() => selectWildlife(opt.value)}
            >
              <p className="font-semibold text-[#3D0C11]">{opt.label}</p>
              <p className="text-sm text-[#6b5b5d] mt-0.5">{opt.desc}</p>
            </OptionCard>
          ))}
        </div>
        <button
          onClick={() => setStep(2)}
          className="mt-6 text-sm text-[#6b5b5d] hover:text-[#3D0C11] transition-colors"
        >
          ← Back
        </button>
      </div>
    )
  }

  // ── Step 4: Results ──────────────────────────────────────────────
  const group = answers.group!

  return (
    <div className="space-y-10">
      {/* Result header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
            Your Results
          </div>
          <h2 className="text-2xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            Keystone Plants for the {group.name}
          </h2>
          <p className="text-sm text-[#6b5b5d]">
            {answers.sun && SUN_OPTIONS.find((s) => s.value === answers.sun)?.label}
            {' · '}
            {answers.wildlife &&
              WILDLIFE_OPTIONS.find((w) => w.value === answers.wildlife)?.label}
          </p>
        </div>
        <button
          onClick={restart}
          className="shrink-0 text-sm text-[#6b5b5d] border border-[#e8f5d8] rounded-sm px-3 py-1.5 hover:border-[#3D0C11] hover:text-[#3D0C11] transition-colors"
        >
          Start over
        </button>
      </div>

      {/* Top keystone genera for this region */}
      <div className="border border-[#e8f5d8] rounded-sm p-5 bg-[#f8fef3] space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            Top Keystone Genera for Your Region
          </h3>
          <p className="text-xs text-[#6b5b5d] mt-0.5">
            Based on NWF data — ranked by caterpillar and specialist bee species supported
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-[#3D0C11] mb-2">Trees</p>
            <div className="space-y-1">
              {group.keystoneTrees.slice(0, 3).map((t) => (
                <div key={t.genus} className="flex items-center justify-between text-sm">
                  <span className="italic text-[#3D0C11]">
                    {t.genus}{' '}
                    <span className="not-italic text-[#6b5b5d]">({t.common})</span>
                  </span>
                  <span className="text-xs text-[#6b5b5d]">{t.caterpillars} spp.</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#3D0C11] mb-2">Perennials</p>
            <div className="space-y-1">
              {group.keystonePerennials.slice(0, 3).map((p) => (
                <div key={p.genus} className="flex items-center justify-between text-sm">
                  <span className="italic text-[#3D0C11]">
                    {p.genus}{' '}
                    <span className="not-italic text-[#6b5b5d]">({p.common})</span>
                  </span>
                  <span className="text-xs text-[#BF6900] font-medium">
                    {p.specialistBees} bees
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={`/ecoregions/${group.slug}`}
          className="inline-block text-xs text-[#BF6900] underline underline-offset-2 hover:text-[#CC5500] transition-colors"
        >
          See full {group.name} ecoregion guide →
        </Link>
      </div>

      {/* Plant grid */}
      {loading ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[#6b5b5d]">Finding your plants&hellip;</p>
        </div>
      ) : plants.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-[#e8f5d8] rounded-sm space-y-3">
          <p className="text-sm font-medium text-[#3D0C11]">
            No plants in the directory match all your filters yet.
          </p>
          <p className="text-sm text-[#6b5b5d]">
            The directory is growing — check the full{' '}
            <Link href="/plants" className="underline hover:text-[#3D0C11]">
              plant list
            </Link>{' '}
            or browse by{' '}
            <Link href={`/ecoregions/${group.slug}`} className="underline hover:text-[#3D0C11]">
              ecoregion
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-[#6b5b5d]">
            {plants.length} plant{plants.length !== 1 ? 's' : ''} in the directory for your
            selections
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plants.map((plant) => (
              <ResultCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      )}

      {/* Email capture */}
      <div className="border-t border-[#e8f5d8] pt-8">
        {emailSaved ? (
          <div className="py-6 text-center space-y-1">
            <p className="font-medium text-[#3D0C11]">You&rsquo;re on the list.</p>
            <p className="text-sm text-[#6b5b5d]">
              We&rsquo;ll send your plant list and seasonal planting reminders to {email}.
            </p>
          </div>
        ) : (
          <div className="max-w-md space-y-3">
            <p className="text-sm font-semibold text-[#3D0C11]">
              Get a printable plant list for your garden
            </p>
            <p className="text-sm text-[#6b5b5d]">
              Enter your email and we&rsquo;ll send you a formatted plant list for the {group.name}{' '}
              — plus seasonal planting tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 border border-[#e8f5d8] rounded-sm px-3 py-2 text-sm text-[#3D0C11] placeholder:text-[#6b5b5d] focus:outline-none focus:border-[#BF6900]"
              />
              <button
                onClick={() => email && setEmailSaved(true)}
                className="shrink-0 bg-[#3D0C11] text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-[#2d0a0d] transition-colors"
              >
                Send list
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
