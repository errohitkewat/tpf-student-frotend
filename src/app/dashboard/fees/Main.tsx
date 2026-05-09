"use client";

import React, { useState } from "react";
import Feesframe from "./Fees.frame";
import AddFeesForm from "./Fees-add";
import FeesEditForm from "./Fees-edit";
import FeesViewDetails from "./Fees-view";
import { FeeStructure } from "@/lib/type";

export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view" | "delete"
  >("table");

  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);

  const handleFeesAdd = () => {
    setCurrentFrame("add");
  };

  const handleFeesView = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setCurrentFrame("view");
  };

  const handleFeesEdit = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setCurrentFrame("edit");
  };

  const handleBack = () => {
    setCurrentFrame("table");
    setSelectedFee(null);
  };

  return (
    <>
      {currentFrame === "add" && <AddFeesForm onBack={handleBack} />}

      {currentFrame === "edit" &&
        (selectedFee ? (
          <FeesEditForm fee={selectedFee} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No fee record selected</div>
        ))}

      {currentFrame === "view" &&
        (selectedFee ? (
          <FeesViewDetails fee={selectedFee} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No fee record selected</div>
        ))}

      {currentFrame === "table" && (
        <Feesframe
          onAddFees={handleFeesAdd}
          onEditFees={handleFeesEdit}
          onViewFees={handleFeesView}
        />
      )}
    </>
  );
}
