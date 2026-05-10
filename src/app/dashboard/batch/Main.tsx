"use client";

import { Activity, useState } from "react";
import { Batch } from "@/lib/type";
import BatchFrame from "./Batch-frame";
import BatchAdd from "./Batch-add";
import BatchEdit from "./Batch-edit";
import BatchView from "./Batch-View";

export default function Main() {
  const [frame, setFrame] = useState<"table" | "add" | "edit" | "view">(
    "table"
  );

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const back = () => {
    setFrame("table");
    setSelectedBatch(null);
  };

  return (
    <>
      <Activity mode={frame === "table" ? "visible" : "hidden"}>
        <BatchFrame
          onAddBatch={() => setFrame("add")}
          onViewBatch={(batch) => {
            setSelectedBatch(batch);
            setFrame("view");
          }}
          onEditBatch={(batch) => {
            setSelectedBatch(batch);
            setFrame("edit");
          }}
        />
      </Activity>

      <Activity mode={frame === "add" ? "visible" : "hidden"}>
        <BatchAdd onBack={back} />
      </Activity>

      <Activity mode={frame === "view" ? "visible" : "hidden"}>
        {selectedBatch && <BatchView batch={selectedBatch} onBack={back} />}
      </Activity>

      <Activity mode={frame === "edit" ? "visible" : "hidden"}>
        {selectedBatch && <BatchEdit batch={selectedBatch} onBack={back} />}
      </Activity>
    </>
  );
}