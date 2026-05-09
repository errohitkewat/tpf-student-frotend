"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscountType } from "@/lib/type";
import { useCreateFeeStructure } from "./mutation";

export default function AddFees({ onBack }: { onBack: () => void }) {
  const { mutate } = useCreateFeeStructure();

  const [f, setF] = useState({
    courseTotalFee: "",
    discountType: DiscountType.PERCENTAGE,
    discountValue: "",
    emiOption: "false",
    enrollmentId: "",
    studentId: "",
  });

  const submit = (e: any) => {
    e.preventDefault();

    mutate({
      courseTotalFee: Number(f.courseTotalFee),
      discountType: f.discountType,
      discountValue: Number(f.discountValue || 0),
      emiOption: f.emiOption === "true",
      enrollmentId: f.enrollmentId,
      studentId: f.studentId,
    });
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent className="p-4">
          <Button onClick={onBack} variant="ghost">
            <ArrowLeft />
          </Button>
          <h1>Add Fee</h1>
        </CardContent>
      </Card>

      <form onSubmit={submit} className="space-y-4 mt-4 bg-white p-4 border rounded-xl">
        <Input placeholder="Total Fee" onChange={(e)=>setF({...f,courseTotalFee:e.target.value})}/>
        <Input placeholder="Discount" onChange={(e)=>setF({...f,discountValue:e.target.value})}/>
        <Input placeholder="Student ID" onChange={(e)=>setF({...f,studentId:e.target.value})}/>
        <Input placeholder="Enrollment ID" onChange={(e)=>setF({...f,enrollmentId:e.target.value})}/>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}