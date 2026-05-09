import kyInstance from "@/lib/ky";

// Create Course Payload
export interface CreateCoursePayload {
  title: string;
  duration: number;
  descriptionInDetail: string;
  descriptionInShort: string;
  imageForThumbnail: string;
  roadmap: string;
  totalFees: number;
  offeredFees: number;
  instractionMode: string;
}

export const createCourse = async (data: CreateCoursePayload) => {
  return await kyInstance.post("courses", { json: data }).json();
};


export interface UpdateCourseFormValues {
  id: string;
  title: string;
  duration: number;
  descriptionInDetail: string;
  descriptionInShort: string;
  imageForThumbnail: string;
  roadmap: string;
  totalFees: number;
  offeredFees: number;
  instractionMode: string;
}

export const updateCourse = async (data: UpdateCoursePayload ,courseId:string) => {
  return await kyInstance.patch(`courses/${courseId}`, { json: data }).json();
};
export type UpdateCoursePayload = Omit<UpdateCourseFormValues, "id">;



export const deleteCourse = async (courseId: string) => {
  return await kyInstance.delete(`courses/${courseId}`).json();
};
 


