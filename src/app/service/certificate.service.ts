import kyInstance from "@/lib/ky";
import { Certificate } from "@/lib/type";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type CreateCertificatePayload = {
  certificateNumber: string;
  verificationHash: string;
  studentId: string;
  courseId: string;
  enrollmentId: string;
  batchId: string;
  templateId: string;
  issueDate: string;
  completionDate: string;
  grade: string;
  generatedBy: string;
  isActive: boolean;
  remarks?: string;
  revokedReason?: string;
  revokedAt?: string;
  pdfUrl?: string;
};

export type UpdateCertificatePayload = Partial<CreateCertificatePayload>;

export const getAllCertificates = async (): Promise<Certificate[]> => {
  const res = await kyInstance
    .get("certificates")
    .json<ApiResponse<Certificate[]>>();

  return res.data || [];
};

export const createCertificate = async (data: CreateCertificatePayload) => {
  const res = await kyInstance
    .post("certificates", { json: data })
    .json<ApiResponse<Certificate>>();

  return res.data;
};

export const updateCertificate = async (
  certificateId: string,
  data: UpdateCertificatePayload
) => {
  const res = await kyInstance
    .patch(`certificates/${certificateId}`, { json: data })
    .json<ApiResponse<Certificate>>();

  return res.data;
};

export const deleteCertificate = async (certificateId: string) => {
  const res = await kyInstance
    .delete(`certificates/${certificateId}`)
    .json<ApiResponse<Certificate>>();

  return res.data;
};