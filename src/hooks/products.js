import { useQuery } from "@tanstack/react-query";
import { getProductDetailsById, getProducts } from "../api/products_api";

export const useProductsQuery = () => useQuery({
    queryKey: ['products-query'],
    queryFn: () => getProducts()
})

export const useProductDetailsQuery = (id) => useQuery({
    queryKey: ['product-details-query', id],
    queryFn: () => getProductDetailsById(id)
})