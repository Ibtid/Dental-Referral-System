export interface IPutDelMutationConfig {
  pathFn(id: number): string;
  isPrivate?: boolean;
}
