import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  CreateStudentPayload,
  UpdateStudentFormValues,
  UpdateStudentPayload,
} from "@/app/service/student.service";

import {
  createStudentAction,
  deleteStudentAction,
  UpdateStudentAction,
} from "./action";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudentPayload) => createStudentAction(data),

    onMutate: async (newStudent) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });

      const previousStudents = queryClient.getQueryData(["students"]);

      queryClient.setQueryData(["students"], (old: CreateStudentPayload) => {
        return old ? [old, { ...newStudent, id: Date.now() }] : [newStudent];
      });

      return { previousStudents };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(["students"], context.previousStudents);
      }
      console.log("student error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Student created successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

type UpdateStudentVariables = {
  studentId: string;
  data: UpdateStudentPayload;
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, data }: UpdateStudentVariables) =>
      UpdateStudentAction(data, studentId),

    onMutate: async ({ studentId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });

      const previousStudents =
        queryClient.getQueryData<UpdateStudentFormValues[]>(["students"]);

      queryClient.setQueryData<UpdateStudentFormValues[]>(
        ["students"],
        (oldStudents = []) => {
          return oldStudents.map((student) =>
            student.id === studentId
              ? { ...student, ...data, id: student.id }
              : student
          );
        }
      );

      return { previousStudents };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(["students"], context.previousStudents);
      }

      console.log("student update error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Student updated successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId: string) => deleteStudentAction(studentId),

    onMutate: async (studentId) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });

      const previousStudents = queryClient.getQueryData<any[]>(["students"]);

      queryClient.setQueryData<any[]>(["students"], (oldStudents = []) => {
        return oldStudents.filter((student) => student.id !== studentId);
      });

      return { previousStudents };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(["students"], context.previousStudents);
      }

      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Student deleted successfully 🗑️");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};