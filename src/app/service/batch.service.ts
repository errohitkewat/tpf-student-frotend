import kyInstance from "@/lib/ky";
import { BatchStatus } from "@/lib/type";

// Create Batch Payload
export interface CreateBatchPayload {
  name: string;
  capacity: number;
  startDate: string;
  endDate: string;
  scheduleTime: string;
  roomNo?: string;
  batchCode: string;
  courseId: string;
  teacherId: string;
  status: BatchStatus;
}

// Update Batch Form Values
export interface UpdateBatchFormValues {
  id: string;
  name: string;
  capacity: number;
  startDate: string;
  endDate: string;
  scheduleTime: string;
  roomNo?: string;
  batchCode: string;
  courseId: string;
  teacherId: string;
  status: BatchStatus;
}

// Update Batch Payload
export type UpdateBatchPayload = Omit<UpdateBatchFormValues, "id">;

// Create Batch
export const createBatch = async (data: CreateBatchPayload) => {
  return await kyInstance.post("batches", { json: data }).json();
};

// Update Batch
export const updateBatch = async (
  data: UpdateBatchPayload,
  batchId: string
) => {
  return await kyInstance.patch(`batches/${batchId}`, { json: data }).json();
};

// Delete Batch
export const deleteBatch = async (batchId: string) => {
  return await kyInstance.delete(`batches/${batchId}`).json();
};