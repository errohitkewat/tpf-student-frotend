import kyInstance from "@/lib/ky";
import { TeacherStatus } from "@/lib/type";

// Create Course Payload

export interface CreateTeacherPayload {
  name: string;
  code: string;
  phone: string;
  email: string;
  qualification: string;
  salaryAmount: number;
  joiningDate: string;
  status: TeacherStatus;
  alternatePhone?: string;
  professionalEmail?: string;
}

export const createTeacher = async (data: CreateTeacherPayload) => {
  return await kyInstance.post("teachers", { json: data }).json();
};




// Update Teacher Form Values
export interface UpdateTeacherFormValues {
  id: string;
  name: string;
  code: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  professionalEmail?: string;
  qualification: string;
  salaryAmount: number;
  joiningDate: string;
  status: TeacherStatus;
}
export type UpdateTeacherPayload = Omit<UpdateTeacherFormValues, "id">;

// Update Teacher function
export const updateTeacher = async (
  data: UpdateTeacherPayload,
  teacherId: string
) => {
  return await kyInstance
    .patch(`teachers/${teacherId}`, { json: data })
    .json();
};



// Delete Teacher 
export const deleteTeacher = async (teacherId: string) => {
  return await kyInstance.delete(`teachers/${teacherId}`).json();
};