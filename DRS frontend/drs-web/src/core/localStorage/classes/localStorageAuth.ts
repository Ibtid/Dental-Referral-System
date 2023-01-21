import { ILocalStorageAuth } from "../../../interfaces/localStorage";
import LocalStorageBase from "./localStorageBase";

class LocalStorageAuth extends LocalStorageBase implements ILocalStorageAuth {
  protected readonly storageName = "auth";

  private readonly accessTokenKey = "accessToken";
  private readonly refreshTokenKey = "refreshToken";

  set accessToken(value: string | null) {
    this.setData(this.accessTokenKey, value);
  }
  get accessToken(): string | null {
    return this.getData(this.accessTokenKey);
  }
  set refreshToken(value: string | null) {
    this.setData(this.refreshTokenKey, value);
  }
  get refreshToken(): string | null {
    return this.getData(this.refreshTokenKey);
  }

  clearAuth() {
    this.accessToken = null;
    this.refreshToken = null;
  }
}

export const StorageAuth: ILocalStorageAuth = new LocalStorageAuth();
