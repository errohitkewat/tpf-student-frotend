import kyInstance from "@/lib/ky";
import { Enquiry, EnquirySource, EnquiryStatus, Gender } from "@/lib/type";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type CreateEnquiryPayload = {
  studentName: string;
  gender: Gender;
  address: string;
  collegeName: string;
  branchName: string;
  DOB: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  source: EnquirySource;
  followUpDate?: string;
  remarks?: string;
  assignedToId: string;
  courseIds?: string[];
};

export type UpdateEnquiryPayload = Partial<CreateEnquiryPayload> & {
  status?: EnquiryStatus;
};

export const getAllEnquiries = async (): Promise<Enquiry[]> => {
  const res = await kyInstance.get("enquiries").json<ApiResponse<Enquiry[]>>();
  return res.data;
};

export const createEnquiry = async (data: CreateEnquiryPayload) => {
  const res = await kyInstance
    .post("enquiries", { json: data })
    .json<ApiResponse<Enquiry>>();
  return res.data;
};

export const updateEnquiry = async (
  id: string,
  data: UpdateEnquiryPayload
) => {
  const res = await kyInstance
    .patch(`enquiries/${id}`, { json: data })
    .json<ApiResponse<Enquiry>>();
  return res.data;
};

export const deleteEnquiry = async (id: string) => {
  const res = await kyInstance.delete(`enquiries/${id}`).json<ApiResponse<Enquiry>>();
  return res.data;
};