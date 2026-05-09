import { CreateTeacherPayload, UpdateTeacherFormValues, UpdateTeacherPayload } from "@/app/service/teacher.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacherAction, deleteTeacherAction, UpdateTeacherAction } from "./action";
import { toast } from "sonner";
import { Teacher } from "@/lib/type";

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeacherPayload) => createTeacherAction(data),

    onMutate: async (newTeacher) => {
      await queryClient.cancelQueries({ queryKey: ["teachers"] });

      const previousTeachers = queryClient.getQueryData<CreateTeacherPayload[]>([
        "teachers",
      ]);

      queryClient.setQueryData<CreateTeacherPayload[]>(["teachers"], (old) => {
        return old
          ? [...old, { ...newTeacher, id: String(Date.now()) }]
          : [{ ...newTeacher, id: String(Date.now()) }];
      });

      return { previousTeachers };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousTeachers) {
        queryClient.setQueryData(["teachers"], context.previousTeachers);
      }
      console.log("teacher error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Teacher created successfully!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};



type UpdateTeacherVariables = {
  teacherId: string;
  data: UpdateTeacherPayload;
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teacherId, data }: UpdateTeacherVariables) =>
      UpdateTeacherAction(data, teacherId),

    onMutate: async ({ teacherId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["teachers"] });

      const previousTeachers = queryClient.getQueryData<UpdateTeacherFormValues[]>([
        "teachers",
      ]);

      queryClient.setQueryData<UpdateTeacherFormValues[]>(
        ["teachers"],
        (oldTeachers = []) => {
          return oldTeachers.map((teacher) =>
            teacher.id === teacherId
              ? { ...teacher, ...data, id: teacher.id }
              : teacher
          );
        }
      );

      return { previousTeachers };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousTeachers) {
        queryClient.setQueryData(["teachers"], context.previousTeachers);
      }

      console.log("teacher update error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Teacher updated successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};

// Delete Teacher Mutation
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId: string) => deleteTeacherAction(teacherId),

    onMutate: async (teacherId) => {
      await queryClient.cancelQueries({ queryKey: ["teachers"] });

      const previousTeachers = queryClient.getQueryData<Teacher[]>(["teachers"]);

      queryClient.setQueryData<Teacher[]>(["teachers"], (oldTeachers = []) =>
        oldTeachers.filter((teacher) => teacher.id !== teacherId)
      );

      return { previousTeachers };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousTeachers) {
        queryClient.setQueryData(["teachers"], context.previousTeachers);
      }

      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Teacher deleted successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};