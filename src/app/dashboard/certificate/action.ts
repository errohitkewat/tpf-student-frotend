"use server";

import {
  createCertificate,
  CreateCertificatePayload,
  deleteCertificate,
  updateCertificate,
  UpdateCertificatePayload,
} from "@/app/service/certificate.service";
import { HTTPError } from "ky";

export const createCertificateAction = async (
  data: CreateCertificatePayload
) => {
  try {
    return await createCertificate(data);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const UpdateCertificateAction = async (
  data: UpdateCertificatePayload,
  certificateId: string
) => {
  try {
    return await updateCertificate(data, certificateId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

export const deleteCertificateAction = async (certificateId: string) => {
  try {
    return await deleteCertificate(certificateId);
  } catch (error) {
    if (error instanceof HTTPError) {
      const err = await error.response.json();
      throw new Error(err?.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};