export const createConfig = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });
