"use server";

import {
  createFeeStructure,
  CreateFeeStructurePayload,
  deleteFeeStructure,
  updateFeeStructure,
  UpdateFeeStructurePayload,
} from "@/app/service/fee.service";
import { HTTPError } from "ky";

export const createFeeStructureAction = async (
  data: CreateFeeStructurePayload
) => {
  try {
    return await createFeeStructure(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const UpdateFeeStructureAction = async (
  data: UpdateFeeStructurePayload,
  feeId: string
) => {
  try {
    return await updateFeeStructure(feeId, data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const deleteFeeStructureAction = async (feeId: string) => {
  try {
    return await deleteFeeStructure(feeId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};