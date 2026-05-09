"use client";

import React, { useState } from "react";
import AttendanceDetails from "./Attendance-View";
import AttendanceFrame from "./Attendance-frame";
import AddAttendanceForm from "./Attendance-add";
import AttendanceEditForm from "./Attendance-Edit";
// import AttendanceAddForm from "./Attendance-add";


export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view" | "delete"
  >("table");

  // const [selectedStudent, setSelectedStudent] = useState<>(null);

  // 🔹 Add
  const handleBackToTable = () => {
    setCurrentFrame("table");
  };

  const handleStudentAdd = () => {
    setCurrentFrame("add");
  };

  // 🔹 View
  const handleStudentView = () => {
    // setSelectedStudent(null);
    setCurrentFrame("view");
  };

  // 🔹 Edit
  const handleStudentEdit = () => {
    // setSelectedStudent(Student);
    setCurrentFrame("edit");
  };

  // 🔹 Delete
  const handleStudentDelete = () => {
    // setSelectedStudent(Student);
    setCurrentFrame("delete");
  };

  // 🔹 Back to table
  const handleBack = () => {
    setCurrentFrame("table");
  };

  const renderCurrentFrame = () => {
    switch (currentFrame) {
      case "add":
        return 

       <AddAttendanceForm onBack={handleBackToTable}/>

      case "view":
        return (
          // <AttendanceDetails onBack={handleBack} />
          // <p>hdgfh</p>
          <AttendanceDetails onBack={handleBack} />
        );

      case "edit":
        return (
        <AttendanceEditForm onBack={handleBack} />
        );


      default:
        return (
          <AttendanceFrame
            onAddStudent={handleStudentAdd}
            onViewStudent={handleStudentView}
             onEditStudent={handleStudentEdit}
            // onDeleteStudent={handleStudentDelete}
          />
        );
    }
  };

  return <div>{renderCurrentFrame()}</div>;
}