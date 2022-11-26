import { useMutation, useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { createCategory, createOrder, createProduct, getCategories, getProductsByCategory } from './api'

import { Product } from '../types/Product'
import { Category } from '../types/Category'
import { Order } from '../types/Order'

const QUERIES_CONFIG = {
  staleTime: 120000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: 1,
  retryDelay: 3000,
}

interface IHandleReturn {
  onSuccess?: (status?: number) => void
  onError?: (status?: number) => void
}

export function useCreateCategorie({ onSuccess, onError }: IHandleReturn) {
  return useMutation(['createCategorie'], (category: Category) => createCategory(category), {
    onSuccess: () => {
      if (onSuccess) onSuccess()
    },
    onError: (error: AxiosError) => {
      if (onError) onError(error.response?.status)
    },
  })
}

export function useGetCategories() {
  return useQuery(['getCategories'], () => getCategories(), {
    ...QUERIES_CONFIG,
  })
}


export function useCreateProduct({ onSuccess, onError }: IHandleReturn) {
  return useMutation(['createUser'], (product: Product) => createProduct(product), {
    onSuccess: () => {
      if (onSuccess) onSuccess()
    },
    onError: (error: AxiosError) => {
      if (onError) onError(error.response?.status)
    },
  })
}

export function useGetProductsByCategory(categoryId?: string) {
  return useQuery(['getProductsByCategory'], () => getProductsByCategory(categoryId), {
    ...QUERIES_CONFIG,
  }
  )
}

export function useCreateOrder({ onSuccess, onError }: IHandleReturn) {
  return useMutation(['createOrder'], (order: Order) => createOrder(order), {
    onSuccess: () => {
      if (onSuccess) onSuccess()
    },
    onError: (error: AxiosError) => {
      if (onError) onError(error.response?.status)
    },
  })
}
