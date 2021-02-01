import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { CalculateStatsController } from "../../src/controller/calculate-stats.controller";
import { Response } from "../../src/model/response.model";
import { CalculateStatsService } from "../../src/services/calculate-stats.service";
import { CalculateStatsImplService } from "../../src/services/calculate-stats-impl.service";
import { DynamoService } from "../../src/repository/dynamo.service";
import { DynamoImplService } from "../../src/repository/dynamo-impl.service";

describe("FindMutantService test", () => {
  const dynamoSpy = jasmine.createSpyObj("DynamoImplService", ["get"]);

  const getSpy = dynamoSpy.get as jasmine.Spy;
  const createRowDynamoSpy = dynamoSpy.createRowDynamo as jasmine.Spy;

  let service: CalculateStatsService;

  beforeEach(() => {
    service = new CalculateStatsImplService(dynamoSpy);
  });

  it("should create a service", () => {
    expect(service).toBeDefined();
  });

  it("should get true on service", (done) => {
    const response = {
      count_mutant_dna: 2,
      count_human_dna: 2,
      ratio: 3,
    };
    getSpy.and.returnValue(Promise.resolve(response));
    service.getStats().then((result) => {
       expect(result.count_mutant_dna).toEqual(undefined);
      done();
    });
  });

});
