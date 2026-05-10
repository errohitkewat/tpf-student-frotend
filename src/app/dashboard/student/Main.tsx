"use client";

import { Activity, useState } from "react";
import { Student } from "@/lib/type";
import Studentframe from "./Student-frame";
import Studentadd from "./Student-add";
import StudentEdit from "./Student-edit";
import StudentView from "./Student-View";

export default function Main() {
  const [frame, setFrame] = useState<"table" | "add" | "edit" | "view">(
    "table"
  );

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const back = () => {
    setFrame("table");
    setSelectedStudent(null);
  };

  return (
    <>
      <Activity mode={frame === "table" ? "visible" : "hidden"}>
        <Studentframe
          onAddStudent={() => setFrame("add")}
          onViewStudent={(student) => {
            setSelectedStudent(student);
            setFrame("view");
          }}
          onEditStudent={(student) => {
            setSelectedStudent(student);
            setFrame("edit");
          }}
        />
      </Activity>

      <Activity mode={frame === "add" ? "visible" : "hidden"}>
        <Studentadd onBack={back} />
      </Activity>

      <Activity mode={frame === "view" ? "visible" : "hidden"}>
        {selectedStudent && (
          <StudentView student={selectedStudent} onBack={back} />
        )}
      </Activity>

      <Activity mode={frame === "edit" ? "visible" : "hidden"}>
        {selectedStudent && (
          <StudentEdit student={selectedStudent} onBack={back} />
        )}
      </Activity>
    </>
  );
}