import axios from 'axios'
import type { ApiErrorResponse } from '@/types/api'

export const isUnauthorizedError = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 401

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}

export const normalizeHeaderValue = (value: unknown): string | null => {
  if (Array.isArray(value)) {
    return normalizeHeaderValue(value[0])
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return null
}
