"use client";

import { useState, useCallback } from "react";

export function useFetch<T, E = Error>(
  action: (...args: any[]) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: E) => void;
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await action(...args);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (e) {
        setError(e as E);
        options?.onError?.(e as E);
      } finally {
        setIsLoading(false);
      }
    },
    [action, options]
  );

  return { execute, isLoading, data, error };
}
