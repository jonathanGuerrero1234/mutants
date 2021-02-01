import "reflect-metadata";
import { handler } from "../src/index";
import { StatusCodes } from "http-status-codes";
import { CalculateStatsController } from "../src/controller/calculate-stats.controller";
import { Response } from "../src/model/response.model";

describe("Index test", () => {
  const body = {
    BODY: "",
  };

  const event = {
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };

  it("Handler ok", () => {
    const response = {
      count_mutant_dna: 1,
      count_human_dna: 2,
      ratio: 3,
    };
    spyOn(CalculateStatsController.prototype, "eventHandler").and.returnValue(Promise.resolve(response));
    handler(event).then((result: any) => {
      expect(result.statusCode).toEqual(StatusCodes.OK);
    });
  });

  it("Handler error", () => {
    const response = new Response(StatusCodes.NOT_FOUND, { data: "Errror" });
    spyOn(CalculateStatsController.prototype, "eventHandler").and.returnValue(Promise.reject(response));
    handler(event).catch((err: any) => {
      console.log('err ---->', err)
       expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
  });
});
