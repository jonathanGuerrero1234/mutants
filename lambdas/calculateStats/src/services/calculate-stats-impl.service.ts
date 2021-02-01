import { CalculateStatsService } from "./calculate-stats.service";
import { injectable, inject } from "inversify";
import { SERVICES } from "../utils/constants";
import { DynamoImplService } from "../repository/dynamo-impl.service";

@injectable()
export class CalculateStatsImplService implements CalculateStatsService {
  constructor(@inject(SERVICES.DynamoService) private dynamo: DynamoImplService) {}

  public getStats(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dynamo
        .get()
        .then((data) => {
          console.log("data en el service-->", this.calculateRatio(data));
          const response = {
            count_mutant_dna: this.getMutants(data),
            count_human_dna: this.getHumans(data),
            ratio: this.calculateRatio(data),
          };
          resolve(response);
        })
        .catch((err) => {
          console.log("errorrrr--->", err);
        });
    });
  }

  public calculateRatio(data: any): number {
    return this.getMutants(data) / this.getHumans(data);
  }

  public getHumans(data: any): number {
    return data.ScannedCount - data.Count;
  }
  public getMutants(data: any): number{
    return data.Count;
  }
}
