"use client";

import { Activity, useState } from "react";
import { Course } from "@/lib/type";
import CourseFrame from "./Course-frame";
import CourseAdd from "./Course-add";
import CourseEdit from "./Course-edit";
import CourseView from "./Course-View";

export default function Main() {
  const [frame, setFrame] = useState<"table" | "add" | "edit" | "view">(
    "table"
  );

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const back = () => {
    setFrame("table");
    setSelectedCourse(null);
  };

  return (
    <>
      <Activity mode={frame === "table" ? "visible" : "hidden"}>
        <CourseFrame
          onAddCourse={() => setFrame("add")}
          onViewCourse={(course) => {
            setSelectedCourse(course);
            setFrame("view");
          }}
          onEditCourse={(course) => {
            setSelectedCourse(course);
            setFrame("edit");
          }}
        />
      </Activity>

      <Activity mode={frame === "add" ? "visible" : "hidden"}>
        <CourseAdd onBack={back} />
      </Activity>

      <Activity mode={frame === "view" ? "visible" : "hidden"}>
        {selectedCourse && (
          <CourseView course={selectedCourse} onBack={back} />
        )}
      </Activity>

      <Activity mode={frame === "edit" ? "visible" : "hidden"}>
        {selectedCourse && (
          <CourseEdit course={selectedCourse} onBack={back} />
        )}
      </Activity>
    </>
  );
}