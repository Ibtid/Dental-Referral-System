import { ILocalStoragePatientAuth } from '../../../interfaces/localStorage';
import LocalStorageBase from './localStorageBase';

class LocalStoragePatientAuth
  extends LocalStorageBase
  implements ILocalStoragePatientAuth
{
  protected readonly storageName = 'patientAuth';

  private readonly reportIdKey = 'reportId';
  private readonly mobileNumberKey = 'mobileNumber';

  set reportId(value: string | null) {
    this.setData<string | null>(this.reportIdKey, value);
  }
  get reportId(): string | null {
    return this.getData<string | null>(this.reportIdKey);
  }
  set mobileNumber(value: string | null) {
    this.setData<string | null>(this.mobileNumberKey, value);
  }
  get mobileNumber(): string | null {
    return this.getData<string | null>(this.mobileNumberKey);
  }

  clearPatientAuth() {
    this.reportId = null;
    this.mobileNumber = null;
  }
}

export const StoragePatientAuth: ILocalStoragePatientAuth =
  new LocalStoragePatientAuth();
