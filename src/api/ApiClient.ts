import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { z } from 'zod';

export interface ApiResult<T> {
  status: number;
  body: T;
}

export abstract class ApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    private readonly token?: string,
  ) {}

  protected get headers(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  protected async parse<S extends z.ZodType>(
    response: APIResponse,
    schema: S,
  ): Promise<ApiResult<z.infer<S>>> {
    return { status: response.status(), body: schema.parse(await response.json()) };
  }
}
