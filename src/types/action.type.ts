// Standardni oblik odgovora Server Action-a (coding standards: { success, data, error })
export type ActionResultType<T> = { success: true; data: T } | { success: false; error: string };
