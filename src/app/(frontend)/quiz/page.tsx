import type { Metadata } from 'next'
import { PlantQuiz } from '@/components/PlantQuiz'

export const metadata: Metadata = {
  title: 'Find Plants for Your Garden',
  description:
    'Answer 3 quick questions about your region, sun exposure, and wildlife goals — get a personalized list of keystone native plants for your yard.',
}

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-3 max-w-2xl">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          Plant Quiz
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Find Plants for Your Garden
        </h1>
        <p className="text-base text-[#6b5b5d] leading-relaxed">
          Answer 3 quick questions and get a personalized list of keystone native plants —
          the species that do the most to support birds, bees, and butterflies in your region.
        </p>
      </div>

      <PlantQuiz />
    </div>
  )
}
