"use service"

import { createCourse, CreateCoursePayload, deleteCourse, updateCourse, UpdateCoursePayload } from "@/app/service/course.service";
import { HTTPError } from "ky";

export const createCourseAction = async (data: CreateCoursePayload) => {
  try {
    return await createCourse(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};




export const UpdateCourseAction = async (
  data: UpdateCoursePayload,
  courseId: string
) => {
  try {
    return await updateCourse(data, courseId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const deleteCourseAction = async (courseId: string) => {
  try {
    return await deleteCourse(courseId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};