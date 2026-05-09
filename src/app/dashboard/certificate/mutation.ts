import {
  CreateCertificatePayload,
  UpdateCertificateFormValues,
  UpdateCertificatePayload,
} from "@/app/service/certificate.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCertificateAction,
  deleteCertificateAction,
  UpdateCertificateAction,
} from "./action";
import { toast } from "sonner";

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCertificatePayload) =>
      createCertificateAction(data),

    onMutate: async (newCertificate) => {
      await queryClient.cancelQueries({ queryKey: ["certificates"] });

      const previousCertificates = queryClient.getQueryData(["certificates"]);

      queryClient.setQueryData(["certificates"], (old: CreateCertificatePayload) => {
        return old
          ? [old, { ...newCertificate, id: Date.now() }]
          : [newCertificate];
      });

      return { previousCertificates };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousCertificates) {
        queryClient.setQueryData(
          ["certificates"],
          context.previousCertificates
        );
      }
      console.log("certificate error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Certificate created successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

type UpdateCertificateVariables = {
  certificateId: string;
  data: UpdateCertificatePayload;
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ certificateId, data }: UpdateCertificateVariables) =>
      UpdateCertificateAction(data, certificateId),

    onMutate: async ({ certificateId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["certificates"] });

      const previousCertificates =
        queryClient.getQueryData<UpdateCertificateFormValues[]>([
          "certificates",
        ]);

      queryClient.setQueryData<UpdateCertificateFormValues[]>(
        ["certificates"],
        (oldCertificates = []) => {
          return oldCertificates.map((certificate) =>
            certificate.id === certificateId
              ? { ...certificate, ...data, id: certificate.id }
              : certificate
          );
        }
      );

      return { previousCertificates };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousCertificates) {
        queryClient.setQueryData(
          ["certificates"],
          context.previousCertificates
        );
      }

      console.log("certificate update error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Certificate updated successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (certificateId: string) =>
      deleteCertificateAction(certificateId),

    onMutate: async (certificateId) => {
      await queryClient.cancelQueries({ queryKey: ["certificates"] });

      const previousCertificates =
        queryClient.getQueryData<any[]>(["certificates"]);

      queryClient.setQueryData<any[]>(["certificates"], (oldCertificates = []) => {
        return oldCertificates.filter(
          (certificate) => certificate.id !== certificateId
        );
      });

      return { previousCertificates };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousCertificates) {
        queryClient.setQueryData(
          ["certificates"],
          context.previousCertificates
        );
      }

      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Certificate deleted successfully 🗑️");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};