import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

const fetchRecipes = async () => {
  const { data } = await axiosInstance.get("/recipes");
  return data;
};
export const fetchPublicRecipes = async () => {
  const { data } = await axiosInstance.get("/recipes/public");
  return data;
};

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });
};
