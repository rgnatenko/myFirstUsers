"use client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Modal from "./Modal";
import Example from "@/app/types/Example";
import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import useQueryParam from "@/lib/useQueryParam";
import Categorie from "@/app/types/Categorie";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateId } from "@/lib/generateId";
import { useToast } from "./ui/use-toast";

interface Props {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Please add title" }),
  duration: z.string().min(1, { message: "Please add duration" }),
  tag: z.string({ message: "Please, select a tag" }),
});

type FormType = z.infer<typeof formSchema>;

export default function AddExampleForm({ setIsAdding }: Props) {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const categoryParam = useQueryParam("category");
  async function fetchCategories(): Promise<Categorie[]> {
    const { data } = await axios.get("/api/categories");
    return data;
  }

  const { data: categories } = useQuery("categories", fetchCategories);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const clearErrors = () => {
    setError("title", { message: "" });
    setError("duration", { message: "" });
    setError("tag", { message: "" });
  };

  const clearForm = () => {
    setValue("title", "");
    setValue("duration", "");
    setValue("tag", "");
  };

  async function addExample(example: Example) {
    const { data } = await axios.post("/api/examples", example);
    return data;
  }

  const { mutate: addNewExample, isLoading: isAddingExample } = useMutation(
    addExample,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["examples", categoryParam]);
        setIsAdding(false);

        toast({
          title: "Succesfully added new example",
        });
      },
      onError: (error) => {
        console.error("Error adding example:", error);
        toast({
          title: "Error happened while creating new example",
          description: "Please, try again",
        });
      },
    }
  );

  const onSubmit = (data: FormType) => {
    console.log(data);
    if (data.title && data.duration && data.tag) {
      addNewExample({
        ...data,
        id: generateId(),
        duration: `${data.duration} min`,
      });
      clearForm();
    }
  };

  const onModalClose = () => {
    setIsAdding(false);
    clearErrors();
    clearForm();
  };

  const onDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("duration", e.target.value);
    const hasNotNumberValues = String(e.target.value)
      .split("")
      .some((item) => isNaN(Number(item)));

    if (hasNotNumberValues) {
      setError("duration", { message: "Duration should be a number" });
      return;
    }

    setError("duration", { message: "" });
  };

  return (
    <Modal title="Add New Example" onClose={onModalClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="">
          <Input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
            value={watch("title")}
          />
          {errors.title?.message && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="">
          <Input
            id="duration"
            {...register("duration")}
            placeholder="Duration"
            value={watch("duration")}
            onChange={onDurationChange}
          />
          {errors.duration?.message && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>

        <div className="">
          <Select
            onValueChange={(e) => setValue("tag", e)}
            {...register("tag")}
            value={watch("tag")}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories &&
                  categories.map((categorie) =>
                    categorie.items.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))
                  )}
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.tag?.message && (
            <p className="text-red-500">{errors.tag.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={isAddingExample}
        >
          {isAddingExample ? "Adding..." : "Add Example"}
        </button>
      </form>
    </Modal>
  );
}
