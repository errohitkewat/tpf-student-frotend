import StatsCard from "@/components/StatsCard"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard title="Courses" value="5" />
        <StatsCard title="Completed" value="2" />
        <StatsCard title="Assignments" value="3" />
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold">Overall Progress</h2>
          <Progress value={60} />
          <p className="text-sm text-muted-foreground">
            60% Course Completed
          </p>
        </CardContent>
      </Card>
    </div>
  )
}