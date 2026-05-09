"use client";

import React, { Activity, useState } from "react";

import Studentframe from "./Student-frame";
import Studentadd from "./Student-add";
import StudentEdit from "./Student-edit";
import StudentView from "./Student-View";
import { Student } from "@/lib/type";

export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view" | "delete"
  >("table");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // 🔹 Add
  const handleStudentAdd = () => {
    setCurrentFrame("add");
  };

  // 🔹 View (FIXED)
  const handleStudentView = (student: Student) => {
    setSelectedStudent(student);
    setCurrentFrame("view");
  };

  // 🔹 Edit (FIXED)
  const handleStudentEdit = (student: Student) => {
    setSelectedStudent(student);
    setCurrentFrame("edit");
  };

  // 🔹 Delete (optional future use)
  const handleStudentDelete = (student: Student) => {
    setSelectedStudent(student);
    setCurrentFrame("delete");
  };

  // 🔹 Back
  const handleBack = () => {
    setCurrentFrame("table");
    setSelectedStudent(null);
  };

  return (
    <>
      {/* ADD */}
      <Activity mode={currentFrame === "add" ? "visible" : "hidden"}>
        <Studentadd onBack={handleBack} />
      </Activity>

      {/* EDIT */}
      <Activity mode={currentFrame === "edit" ? "visible" : "hidden"}>
        {selectedStudent ? (
          <StudentEdit student={selectedStudent} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No student selected</div>
        )}
      </Activity>

      {/* VIEW */}
      <Activity mode={currentFrame === "view" ? "visible" : "hidden"}>
        {selectedStudent ? (
          <StudentView student={selectedStudent} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No student selected</div>
        )}
      </Activity>

      {/* TABLE */}
      <Activity mode={currentFrame === "table" ? "visible" : "hidden"}>
        <Studentframe
          onAddStudent={handleStudentAdd}
          onViewStudent={handleStudentView}
          onEditStudent={handleStudentEdit}
        />
      </Activity>
    </>
  );
}
