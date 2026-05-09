"use server";

import {
  createTeacher,
  CreateTeacherPayload,
  deleteTeacher,
  updateTeacher,
  UpdateTeacherPayload,
} from "@/app/service/teacher.service";
import { HTTPError } from "ky";

export const createTeacherAction = async (data: CreateTeacherPayload) => {
  try {
    return await createTeacher(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const contentType = error.response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const err = await error.response.json();
        throw new Error(err?.message || "Something went wrong");
      }

      const text = await error.response.text();
      throw new Error(text || "Server error");
    }

    throw new Error("Network error");
  }
};




export const UpdateTeacherAction = async (
  data: UpdateTeacherPayload,
  teacherId: string
) => {
  try {
    return await updateTeacher(data, teacherId);
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const err = await error.response.json();
        throw new Error(err?.message || "Something went wrong");
      } catch {
        throw new Error("Server error");
      }
    }
    throw new Error("Network error");
  }
};

export const deleteTeacherAction = async (teacherId: string) => {
  try {
    return await deleteTeacher(teacherId);
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const err = await error.response.json();
        throw new Error(err?.message || "Something went wrong");
      } catch {
        throw new Error("Server error");
      }
    }
    throw new Error("Network error");
  }
};