import { ArrowRight, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const beforeData = [
  { lookup: "ACME Corp", result: "#N/A", status: "error" },
  { lookup: "  Johnson LLC", result: "#N/A", status: "error" },
  { lookup: "Smiths Inc.", result: "#N/A", status: "error" },
  { lookup: "WIDGETS CO", result: "#N/A", status: "error" },
]

const afterData = [
  { lookup: "ACME Corp", result: "Matched", status: "success" },
  { lookup: "Johnson LLC", result: "Matched", status: "success" },
  { lookup: "Smith's Inc", result: "Fuzzy Match", status: "success" },
  { lookup: "Widgets Co.", result: "Matched", status: "success" },
]

export function VisualDemo() {
  return (
    <section id="demo" className="bg-card px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">See the Magic in Action</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            SmartMatch automatically detects and fixes the issues that cause lookup failures.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-4">
          {/* Before Card */}
          <Card className="w-full border-error/30 bg-error/5 lg:flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-error">
                <X className="h-5 w-5" />
                Before SmartMatch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Lookup Value</th>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beforeData.map((row, idx) => (
                      <tr key={idx} className="border-t border-border">
                        <td className="px-4 py-3 font-mono text-foreground">{row.lookup}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-error/10 px-2 py-1 text-xs font-medium text-error">
                            <X className="h-3 w-3" />
                            {row.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground lg:h-14 lg:w-14">
            <ArrowRight className="h-6 w-6 rotate-90 lg:rotate-0" />
          </div>

          {/* After Card */}
          <Card className="w-full border-success/30 bg-success/5 lg:flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-success">
                <Check className="h-5 w-5" />
                After SmartMatch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Lookup Value</th>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {afterData.map((row, idx) => (
                      <tr key={idx} className="border-t border-border">
                        <td className="px-4 py-3 font-mono text-foreground">{row.lookup}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                            <Check className="h-3 w-3" />
                            {row.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
