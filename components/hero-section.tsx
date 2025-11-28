import { WaitlistForm } from "@/components/waitlist-form"

export function HeroSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Early Access Now Open
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Stop Fixing VLOOKUP <span className="text-primary">#N/A Errors</span> Manually.
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground sm:text-xl">
              The intelligent tool that detects hidden spaces, format mismatches, and fuzzy matches instantly. Save
              hours of frustrating data cleanup.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Works with Excel & Sheets
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  )
}
