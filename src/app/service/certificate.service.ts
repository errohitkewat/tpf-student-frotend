import kyInstance from "@/lib/ky";

// Create Certificate Payload
export interface CreateCertificatePayload {
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

  remarks?: string;
  revokedReason?: string;
  revokedAt?: string;

  generatedBy: string;
  pdfUrl?: string;

  isActive: boolean;
}

// Update Certificate Form Values
export interface UpdateCertificateFormValues {
  id: string;

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

  remarks?: string;
  revokedReason?: string;
  revokedAt?: string;

  generatedBy: string;
  pdfUrl?: string;

  isActive: boolean;
}

// Update Certificate Payload
export type UpdateCertificatePayload = Omit<UpdateCertificateFormValues, "id">;

// Create Certificate
export const createCertificate = async (data: CreateCertificatePayload) => {
  return await kyInstance.post("certificates/generate", { json: data }).json();
};

// Update Certificate
export const updateCertificate = async (
  data: UpdateCertificatePayload,
  certificateId: string
) => {
  return await kyInstance
    .patch(`certificates/${certificateId}`, { json: data })
    .json();
};

// Delete Certificate
export const deleteCertificate = async (certificateId: string) => {
  return await kyInstance.delete(`certificates/${certificateId}`).json();
};