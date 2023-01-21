export interface ILocalStorageAuth {
  accessToken: string | null;
  refreshToken: string | null;
  clearAuth(): void;
}
