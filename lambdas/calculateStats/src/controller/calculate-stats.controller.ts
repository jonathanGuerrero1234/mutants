import { inject, injectable } from "inversify";
import { Response } from "../model/response.model";
import { SERVICES, UTILS } from "../utils/constants";
import { CalculateStatsService } from "../services/calculate-stats.service";

@injectable()
export class CalculateStatsController {
  constructor(@inject(SERVICES.CalculateStatsService) private service: CalculateStatsService) {}

  public eventHandler(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service
        .getStats()
        .then((data) => resolve(data))
        .catch((err: Response) => {
          reject(err);
          console.error("ERROR: ", err);
        });
    });
  }
}
