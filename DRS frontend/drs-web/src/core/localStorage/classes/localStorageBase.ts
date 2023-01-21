import useEnv from "../../../hooks/useEnv";

const { appName } = useEnv();

abstract class LocalStorageBase {
  private readonly appName = appName;
  protected abstract storageName: string;

  private storageKey(key: string): string {
    return `${this.appName}/${this.storageName}/${key}`;
  }

  protected setData<T>(key: string, data: T): void {
    const storedKey = this.storageKey(key);
    if (data) {
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem(storedKey, stringifiedData);
    } else {
      localStorage.removeItem(storedKey);
    }
  }

  protected getData<T>(key: string): T | null {
    const storedKey = this.storageKey(key);
    const storedData = localStorage.getItem(storedKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData;
    }
    return null;
  }

  protected clearAll(): void {
    localStorage.clear();
  }
}

export default LocalStorageBase;
