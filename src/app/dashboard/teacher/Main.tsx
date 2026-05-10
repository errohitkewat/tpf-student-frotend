"use client";

import { Activity, useState } from "react";
import { Teacher } from "@/lib/type";
import TeacherFrame from "./Teacher-frame";
import TeacherAdd from "./Teacher-add";
import TeacherEdit from "./Teacher-edit";
import TeacherView from "./Teacher-View";

export default function Main() {
  const [frame, setFrame] = useState<"table" | "add" | "edit" | "view">(
    "table"
  );

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const back = () => {
    setFrame("table");
    setSelectedTeacher(null);
  };

  return (
    <>
      <Activity mode={frame === "table" ? "visible" : "hidden"}>
        <TeacherFrame
          onAddTeacher={() => setFrame("add")}
          onViewTeacher={(teacher) => {
            setSelectedTeacher(teacher);
            setFrame("view");
          }}
          onEditTeacher={(teacher) => {
            setSelectedTeacher(teacher);
            setFrame("edit");
          }}
        />
      </Activity>

      <Activity mode={frame === "add" ? "visible" : "hidden"}>
        <TeacherAdd onBack={back} />
      </Activity>

      <Activity mode={frame === "view" ? "visible" : "hidden"}>
        {selectedTeacher && (
          <TeacherView teacher={selectedTeacher} onBack={back} />
        )}
      </Activity>

      <Activity mode={frame === "edit" ? "visible" : "hidden"}>
        {selectedTeacher && (
          <TeacherEdit teacher={selectedTeacher} onBack={back} />
        )}
      </Activity>
    </>
  );
}