import { StatusCodes } from "http-status-codes";
import "reflect-metadata";
import { CalculateStatsController } from "./controller/calculate-stats.controller";
import { AppContainer } from "./inversify.config";
import { Response } from "./model/response.model";
import { CONTROLLERS } from "./utils/constants";

export function handler(event: any) {
  return new Promise((resolve, reject) => {
    const controller: CalculateStatsController = AppContainer.get<CalculateStatsController>(
      CONTROLLERS.CalculateStatsController,
    );
    controller
      .eventHandler()
      .then((data) => {
        resolve(new Response(StatusCodes.OK, { data: data }));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
