import { Response } from "../model/response.model";
export interface FindMutantService {
  isMutant(dna: string[]): Promise<boolean | Response>;
}
