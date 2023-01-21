export interface IInvestigationCreatePatchPayload {
  id: number;
  name: string;
  category: string;
  description: string;
  referenceValue: string;
  cost: number;
  comission: number;
}
