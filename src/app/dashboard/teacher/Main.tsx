"use client";

import React, { Activity, useState } from "react";

import TeacherFrame from "../teacher/Teacher-frame";
import TeacherAdd from "../teacher/Teacher-add";
import TeacherView from "../teacher/Teacher-View";
import TeacherEdit from "../teacher/Teacher-edit";
import { Teacher } from "@/lib/type";
import EditTeacherForm from "../teacher/Teacher-edit";

export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view" | "delete"
  >("table");
  

  // const [selectedTeacher, setSelectedTeacher] = useState<>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // 🔹 Add
  const handleBackToTable = () => {
    setCurrentFrame("table");
  };

  const handleTeacherAdd = () => {
    setCurrentFrame("add");
  };

  // 🔹 View
const handleTeacherView = (teacher: Teacher) => {
  setSelectedTeacher(teacher);
  setCurrentFrame("view");
};

  // 🔹 Edit
const handleTeacherEdit = (teacher: Teacher) => {
  setSelectedTeacher(teacher);
  setCurrentFrame("edit");
};

  // 🔹 Delete
  const handleTeacherDelete = () => {
    setSelectedTeacher(teacher);
    setCurrentFrame("delete");
  };

  // 🔹 Back to table
  const handleBack = () => {
    setCurrentFrame("table");
  };


  return (
    <>
      <Activity mode={currentFrame === "add" ? "visible" : "hidden"}>
        <TeacherAdd onBack={handleBack} />
      </Activity>

      <Activity mode={currentFrame === "edit" ? "visible" : "hidden"}>
        {selectedTeacher ? (
          <EditTeacherForm teacher={selectedTeacher} onBack={handleBack} />
        ) : (
          <div className="p-6 text-red-500">No teacher selected</div>
        )}
      </Activity>

      <Activity mode={currentFrame === "view" ? "visible" : "hidden"}>
        {selectedTeacher && (
          <TeacherView teacher={selectedTeacher} onBack={handleBack} />
        )}
      </Activity>

      <Activity mode={currentFrame === "table" ? "visible" : "hidden"}>
        <TeacherFrame
          onAddTeacher={handleTeacherAdd}
          onViewTeacher={handleTeacherView}
          onEditTeacher={handleTeacherEdit}
        />
      </Activity>
    </>
  );
}


