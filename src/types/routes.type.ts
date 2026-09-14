import type { ROUTES } from "@/constants/routes";

type ExtractRoutes<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? ExtractRoutes<T[keyof T]>
    : never;

export type AppRoute = ExtractRoutes<typeof ROUTES>;
