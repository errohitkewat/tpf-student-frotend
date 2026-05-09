"use client";

import { Activity, useState } from "react";
import BatchFrame from "../batch/Batch-frame";
import BatchAdd from "../batch/Batch-add";
import BatchView from "../batch/Batch-View";
import BatchEdit from "../batch/Batch-edit";
import { Batch } from "@/lib/type";

export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view" | "delete"
  >("table");

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const handleBatchAdd = () => {
    setCurrentFrame("add");
  };

  const handleBatchView = (batch: Batch) => {
    setSelectedBatch(batch);
    setCurrentFrame("view");
  };

  const handleBatchEdit = (batch: Batch) => {
    setSelectedBatch(batch);
    setCurrentFrame("edit");
  };

  const handleBack = () => {
    setCurrentFrame("table");
    setSelectedBatch(null);
  };

  return (
    <>
      <Activity mode={currentFrame === "add" ? "visible" : "hidden"}>
        <BatchAdd onBack={handleBack} />
      </Activity>

      <Activity mode={currentFrame === "edit" ? "visible" : "hidden"}>
        {selectedBatch ? (
          <BatchEdit batch={selectedBatch} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No batch selected</div>
        )}
      </Activity>

      <Activity mode={currentFrame === "view" ? "visible" : "hidden"}>
        {selectedBatch ? (
          <BatchView batch={selectedBatch} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No batch selected</div>
        )}
      </Activity>

      <Activity mode={currentFrame === "table" ? "visible" : "hidden"}>
        <BatchFrame
          onAddBatch={handleBatchAdd}
          onViewBatch={handleBatchView}
          onEditBatch={handleBatchEdit}
        />
      </Activity>
    </>
  );
}
