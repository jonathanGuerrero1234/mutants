import { Response } from "../model/response.model";
export interface CalculateStatsService {
  getStats(): Promise<any>;
}
