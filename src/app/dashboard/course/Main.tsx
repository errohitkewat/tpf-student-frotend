"use client";

import { Activity, useState } from "react";
import CourseAdd from "./Course-add";
import Courseframe from "./Course-frame";
import CourseView from "./Course-View";
import CourseEdit from "./Course-edit";
import { Course } from "@/lib/type";

export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view"
  >("table");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseAdd = () => {
    setCurrentFrame("add");
  };

  const handleCourseView = (course: Course) => {
    setSelectedCourse(course);
    setCurrentFrame("view");
  };

  const handleCourseEdit = (course: Course) => {
    setSelectedCourse(course);
    setCurrentFrame("edit");
  };

  const handleBack = () => {
    setCurrentFrame("table");
    setSelectedCourse(null);
  };

  return (
    <>
      <Activity mode={currentFrame === "add" ? "visible" : "hidden"}>
        <CourseAdd onBack={handleBack} />
      </Activity>

      <Activity mode={currentFrame === "edit" ? "visible" : "hidden"}>
        {selectedCourse ? (
          <CourseEdit course={selectedCourse} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No course selected</div>
        )}
      </Activity>

      <Activity mode={currentFrame === "view" ? "visible" : "hidden"}>
        {selectedCourse ? (
          <CourseView course={selectedCourse} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No course selected</div>
        )}
      </Activity>

      <Activity mode={currentFrame === "table" ? "visible" : "hidden"}>
        <Courseframe
          onAddCourse={handleCourseAdd}
          onViewCourse={handleCourseView}
          onEditCourse={handleCourseEdit}
        />
      </Activity>
    </>
  );
}
