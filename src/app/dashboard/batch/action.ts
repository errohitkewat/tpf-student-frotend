"use server";

import {
  createBatch,
  CreateBatchPayload,
  deleteBatch,
  updateBatch,
  UpdateBatchPayload,
} from "@/app/service/batch.service";
import { HTTPError } from "ky";

export const createBatchAction = async (data: CreateBatchPayload) => {
  try {
    return await createBatch(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const UpdateBatchAction = async (
  data: UpdateBatchPayload,
  batchId: string
) => {
  try {
    return await updateBatch(data, batchId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const deleteBatchAction = async (batchId: string) => {
  try {
    return await deleteBatch(batchId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};