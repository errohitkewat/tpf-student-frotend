"use client";

import { Activity, useState } from "react";
import EnquiryFrame from "./Enquiry-frame";
import EnquiryAdd from "./Enquiry-add";
import EnquiryView from "./Enquiry-view";
import EnquiryEdit from "./Enquiry-edit";
import { Enquiry } from "@/lib/type";

export default function Main() {
  const [frame, setFrame] = useState<"table" | "add" | "view" | "edit">(
    "table"
  );
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const back = () => {
    setFrame("table");
    setSelectedEnquiry(null);
  };

  return (
    <>
      <Activity mode={frame === "table" ? "visible" : "hidden"}>
        <EnquiryFrame
          onAdd={() => setFrame("add")}
          onView={(enquiry) => {
            setSelectedEnquiry(enquiry);
            setFrame("view");
          }}
          onEdit={(enquiry) => {
            setSelectedEnquiry(enquiry);
            setFrame("edit");
          }}
        />
      </Activity>

      <Activity mode={frame === "add" ? "visible" : "hidden"}>
        <EnquiryAdd onBack={back} />
      </Activity>

      <Activity mode={frame === "view" ? "visible" : "hidden"}>
        {selectedEnquiry && <EnquiryView enquiry={selectedEnquiry} onBack={back} />}
      </Activity>

      <Activity mode={frame === "edit" ? "visible" : "hidden"}>
        {selectedEnquiry && <EnquiryEdit enquiry={selectedEnquiry} onBack={back} />}
      </Activity>
    </>
  );
}