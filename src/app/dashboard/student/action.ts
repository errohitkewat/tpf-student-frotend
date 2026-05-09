"use server";

import {
  createStudent,
  updateStudent,
  deleteStudent,
  CreateStudentPayload,
  UpdateStudentPayload,
} from "@/app/service/student.service";
import { HTTPError } from "ky";

export const createStudentAction = async (data: CreateStudentPayload) => {
  try {
    return await createStudent(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const UpdateStudentAction = async (
  data: UpdateStudentPayload,
  studentId: string
) => {
  try {
    return await updateStudent(data, studentId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const deleteStudentAction = async (studentId: string) => {
  try {
    return await deleteStudent(studentId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};