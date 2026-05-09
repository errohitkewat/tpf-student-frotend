import { CreateCoursePayload, UpdateCourseFormValues, UpdateCoursePayload } from "@/app/service/course.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseAction, deleteCourseAction, UpdateCourseAction } from "./action";
import { toast } from "sonner";


export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCoursePayload) =>  createCourseAction(data),

    onMutate: async (newCourse) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      const previousCourses = queryClient.getQueryData(["courses"]);

      queryClient.setQueryData(["courses"], (old: CreateCoursePayload) => {
        return old ? [old, { ...newCourse, id: Date.now() }] : [newCourse];
      });

      return { previousCourses };
    },


    onError: (error: Error, _variables, context) => {
      if (context?.previousCourses) {
        queryClient.setQueryData(["courses"], context.previousCourses);
      }
      console.log("cor erro",error)
      toast.error(error.message);
    },


    onSuccess: () => {
      toast.success("Course created successfully 🎉");
    },


    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};


type UpdateCourseVariables = {
  courseId: string;
  data: UpdateCoursePayload;
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, data }: UpdateCourseVariables) =>
      UpdateCourseAction(data, courseId),

    onMutate: async ({ courseId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      const previousCourses = queryClient.getQueryData<UpdateCourseFormValues[]>(["courses"]);

      queryClient.setQueryData<UpdateCourseFormValues[]>(["courses"], (oldCourses = []) => {
        return oldCourses.map((course) =>
          course.id === courseId ? { ...course, ...data, id: course.id } : course
        );
      });

      return { previousCourses };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousCourses) {
        queryClient.setQueryData(["courses"], context.previousCourses);
      }

      console.log("course update error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Course updated successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};



export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => deleteCourseAction(courseId),

    onMutate: async (courseId) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      const previousCourses = queryClient.getQueryData<any[]>(["courses"]);

      queryClient.setQueryData<any[]>(["courses"], (oldCourses = []) => {
        return oldCourses.filter((course) => course.id !== courseId);
      });

      return { previousCourses };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousCourses) {
        queryClient.setQueryData(["courses"], context.previousCourses);
      }

      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Course deleted successfully 🗑️");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
