import kyInstance from "@/lib/ky";
import {
  DiscountType,
  FeePayment,
  FeeStructure,
  PaymentMode,
  PaymentStatus,
} from "@/lib/type";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface CreateFeeStructurePayload {
  courseTotalFee: number;
  discountType?: DiscountType;
  discountValue?: number;
  emiOption: boolean;
  enrollmentId: string;
  studentId: string;
}

export interface UpdateFeeStructurePayload {
  courseTotalFee?: number;
  discountType?: DiscountType;
  discountValue?: number;
  emiOption?: boolean;
}

export interface CreatePaymentPayload {
  totalAmount: number;
  paymentMode: PaymentMode;
  status: PaymentStatus;
  transactionRef?: string;
  note?: string;
  paidDate?: string;
  studentId: string;
  // IMPORTANT: your backend uses this typo key
  festructureId: string;
}

export const getAllFeeStructures = async (): Promise<FeeStructure[]> => {
  const res = await kyInstance
    .get("fee-structures")
    .json<ApiResponse<FeeStructure[]>>();
  return res.data;
};

export const createFeeStructure = async (
  data: CreateFeeStructurePayload
): Promise<FeeStructure> => {
  const res = await kyInstance
    .post("fee-structures", { json: data })
    .json<ApiResponse<FeeStructure>>();
  return res.data;
};

export const updateFeeStructure = async (
  feeId: string,
  data: UpdateFeeStructurePayload
): Promise<FeeStructure> => {
  const res = await kyInstance
    .patch(`fee-structures/${feeId}`, { json: data })
    .json<ApiResponse<FeeStructure>>();
  return res.data;
};

export const deleteFeeStructure = async (feeId: string) => {
  const res = await kyInstance
    .delete(`fee-structures/${feeId}`)
    .json<ApiResponse<FeeStructure>>();
  return res.data;
};

export const createFeePayment = async (
  data: CreatePaymentPayload
): Promise<FeePayment> => {
  const res = await kyInstance
    .post("payments", { json: data })
    .json<ApiResponse<FeePayment>>();
  return res.data;
};