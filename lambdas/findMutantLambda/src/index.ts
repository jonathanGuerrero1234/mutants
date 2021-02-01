import "reflect-metadata";
import { FindMutantController } from "./controller/find-mutant.controller";
import { AppContainer } from "./inversify.config";
import { Response } from "./model/response.model";
import { CONTROLLERS } from "./utils/constants";
import { StatusCodes } from "http-status-codes";

export function handler(event: any) {
  return new Promise((resolve) => {
    const controller: FindMutantController = AppContainer.get<FindMutantController>(CONTROLLERS.FindMutantController);
    controller
      .eventHandler(event.body)
      .then((response) => {
        if (response) {
          return resolve(new Response(StatusCodes.OK, {}));
        } else {
          return resolve(new Response(StatusCodes.FORBIDDEN, {}));
        }
      })
      .catch((err) => {
        resolve(err);
      });
  });
}
