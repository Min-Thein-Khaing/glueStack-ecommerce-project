/** Normalize login / refresh API shapes (token vs accessToken, randToken vs randomToken). */
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  randomToken: string;
};

export function parseAuthTokens(data: Record<string, unknown> | null | undefined): AuthTokens | null {
  if (!data) return null;

  const accessToken = (data.token ?? data.accessToken) as string | undefined;
  const refreshToken = data.refreshToken as string | undefined;
  const randomToken = (data.randToken ?? data.randomToken) as string | undefined;

  if (!accessToken || !refreshToken || !randomToken) {
    return null;
  }

  return { accessToken, refreshToken, randomToken };
}
