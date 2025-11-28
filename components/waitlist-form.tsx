"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { submitWaitlist } from "@/actions/submit-waitlist"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Loader2, Mail, MessageSquare } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      size="lg"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Joining...
        </>
      ) : (
        "Join Waitlist"
      )}
    </Button>
  )
}

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    const result = await submitWaitlist(formData)
    if (result.success) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md border-success/30 bg-success/5">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">You&apos;re on the list!</h3>
          <p className="text-muted-foreground">
            Check your inbox for a welcome email. We&apos;ll notify you when SmartMatch is ready.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-xl font-semibold">Get Early Access</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email Address
            </Label>
            <Input id="email" name="email" type="email" placeholder="you@company.com" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Tell us your problem
            </Label>
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="What is your biggest Excel data pain?"
              className="min-h-[100px] resize-none"
              required
            />
          </div>
          <SubmitButton />
          <p className="text-center text-xs text-muted-foreground">
            By joining, you agree to receive product updates. Unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
