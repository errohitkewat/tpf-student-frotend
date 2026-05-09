"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Props {
  title: string
  value: string
}

export default function StatsCard({ title, value }: Props) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </CardContent>
      </Card>
    </motion.div>
  )
}