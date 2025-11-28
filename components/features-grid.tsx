import { Eraser, Wand2, Binary } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Eraser,
    title: "Ghost Space Remover",
    description:
      "Automatically detects and removes invisible leading, trailing, and non-breaking spaces that break your lookups.",
  },
  {
    icon: Wand2,
    title: "Fuzzy Logic Matcher",
    description:
      "Uses intelligent algorithms to match similar text even with typos, abbreviations, or slight variations.",
  },
  {
    icon: Binary,
    title: "Type Unifier",
    description: "Converts and standardizes data types so numbers stored as text match actual numbers seamlessly.",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Powerful Features, Zero Complexity</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            SmartMatch handles the tedious work so you can focus on insights, not data cleaning.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="group border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
