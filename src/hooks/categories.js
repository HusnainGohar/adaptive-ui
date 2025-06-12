import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryDetailsById } from "../api/categories_api";

export const useCategoriesQuery = () => useQuery({
    queryKey: ['categories-query'],
    queryFn: () => getCategories()
})

export const useCategoryDetailsQuery = (id) => useQuery({
    queryKey: ['category-details-query', id],
    queryFn: () => getCategoryDetailsById(id)
})