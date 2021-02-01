import { inject, injectable } from "inversify";
import { Response } from "../model/response.model";
import { constants, SERVICES, UTILS } from "../utils/constants";
import { RequestValidator } from "../utils/request-validator";
import { StatusCodes } from "http-status-codes";
import * as schema from "../resources/schema-request.json";
import { FindMutantService } from "../services/find-mutant.service";

@injectable()
export class FindMutantController {
  constructor(
    @inject(UTILS.RequestValidator) private validator: RequestValidator,
    @inject(SERVICES.FindMutantService) private service: FindMutantService,
  ) {}

  public eventHandler(body: any): Promise<boolean | Response> {
    console.log("el body en el ccontroller ------>", body);
    const json = JSON.parse(body);
    return new Promise((resolve, reject) => {
      this.validator
        .validate(json, schema)
        .then((dna) => {
          return this.validateLength(dna);
        })
        .then((result) => {
          if (result) {
            return resolve(this.service.isMutant(json.dna));
          } else {
            return reject(new Response(StatusCodes.NOT_FOUND, { message: constants.ERROR_LENGTH }));
          }
        })
        .catch((err: Response) => {
          return reject(err);
        });
    });
  }

  private validateLength(array: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      if (array.length > 5) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  }
}
