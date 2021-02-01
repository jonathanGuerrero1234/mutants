import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { CalculateStatsController } from "../../src/controller/calculate-stats.controller";
import { Response } from "../../src/model/response.model";
import { CalculateStatsImplService } from "../../src/services/calculate-stats-impl.service";
import { CalculateStatsService } from "../../src/services/calculate-stats.service";

describe("Index test", () => {
  const serviceSpy = jasmine.createSpyObj("CalculateStatsImplService", ["getStats"]);

  const getStatsSpy = serviceSpy.getStats as jasmine.Spy;

  let controller: CalculateStatsController;

  beforeEach(() => {
    controller = new CalculateStatsController(serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("should get a stats result", (done) => {
    const response = {
      count_mutant_dna: 1,
      count_human_dna: 2,
      ratio: 3,
    };
    const result = Promise.resolve(response);
    getStatsSpy.and.returnValue(result);

    controller.eventHandler().then((result) => {
      expect(result.count_mutant_dna).toEqual(response.count_mutant_dna);
      done();
    });
  });

  it("should get an error", (done) => {
    const response = new Response(StatusCodes.NOT_FOUND, { data: "Errror" });
    const result = Promise.reject(response);
    getStatsSpy.and.returnValue(result);

    controller.eventHandler().catch((err) => {
      expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND);
      done();
    });
  });
});
