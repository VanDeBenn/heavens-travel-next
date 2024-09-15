export const config = {
  baseUrl:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") || process.env.NEXT_PUBLIC_API_URL,
};
