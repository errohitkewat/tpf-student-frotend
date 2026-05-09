import kyInstance from "@/lib/ky";

// 🔹 Create Student Payload
export interface CreateStudentPayload {
  name: string;
  gender: string;

  address: string;
  collegeName: string;
  branchName: string;

  DOB: string;

  mobile: string;
  alternateMobile?: string;

  email: string;

  fatherName?: string;
  fatherContact?: string;
  fatherOccupation?: string;

  motherName?: string;
  motherContact?: string;
  motherOccupation?: string;

  admissionDate: string;

  status: string;

  batchId: string;
}

// 🔹 Update Student Form Values
export interface UpdateStudentFormValues {
  id: string;

  name: string;
  gender: string;

  address: string;
  collegeName: string;
  branchName: string;

  DOB: string;

  mobile: string;
  alternateMobile?: string;

  email: string;

  fatherName?: string;
  fatherContact?: string;
  fatherOccupation?: string;

  motherName?: string;
  motherContact?: string;
  motherOccupation?: string;

  admissionDate: string;

  status: string;

  batchId: string;
}

// 🔹 Update Payload
export type UpdateStudentPayload = Omit<UpdateStudentFormValues, "id">;


// ✅ CREATE
export const createStudent = async (data: CreateStudentPayload) => {
  return await kyInstance.post("students", { json: data }).json();
};


// ✅ UPDATE
export const updateStudent = async (
  data: UpdateStudentPayload,
  studentId: string
) => {
  return await kyInstance
    .patch(`students/${studentId}`, { json: data })
    .json();
};


// ✅ DELETE
export const deleteStudent = async (studentId: string) => {
  return await kyInstance.delete(`students/${studentId}`).json();
};