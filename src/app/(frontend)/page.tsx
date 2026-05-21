import { ZipSearchForm } from "@/components/ZipSearchForm";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-28 text-center">
      <div className="max-w-xl space-y-7">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-[#3D0C11] leading-tight">
            Discover Native Plants<br />Across America
          </h1>
          <p className="text-lg text-[#6b5b5d] leading-relaxed">
            Find nurseries near you that grow and sell native plants.
            Support local ecosystems — one yard at a time.
          </p>
        </div>

        <ZipSearchForm />

        <p className="text-sm text-[#6b5b5d]">
          Or{" "}
          <a href="/nurseries" className="underline decoration-[#DDFC74] decoration-2 underline-offset-2 hover:text-[#3D0C11] transition-colors">
            browse all nurseries
          </a>
        </p>
      </div>
    </div>
  );
}
