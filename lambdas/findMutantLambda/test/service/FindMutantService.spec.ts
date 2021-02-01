import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { FindMutantController } from "../../src/controller/find-mutant.controller";
import { Response } from "../../src/model/response.model";
import { FindMutantService } from "../../src/services/find-mutant.service";
import { FindMutantImplService } from "../../src/services/find-mutant-impl.service";
import { DynamoService } from "../../src/repository/dynamo.service";
import { DynamoImplService } from "../../src/repository/dynamo-impl.service";

describe("FindMutantService test", () => {
  const dynamoSpy = jasmine.createSpyObj("DynamoImplService", ["save", "createRowDynamo"]);

  const saveSpy = dynamoSpy.save as jasmine.Spy;
  const createRowDynamoSpy = dynamoSpy.createRowDynamo as jasmine.Spy;

  let service: FindMutantService;

  beforeEach(() => {
    service = new FindMutantImplService(dynamoSpy);
  });

  it("should create a service", () => {
    expect(service).toBeDefined();
  });

  it("should get true on service", (done) => {
    const row = {
      dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      isMutant: true,
    };
    const Item = {
      id: "",
      dna: "",
      isMutant: true,
    };

    const result = Promise.resolve(row);
    createRowDynamoSpy.and.returnValue(result);
    saveSpy.and.returnValue(Promise.resolve(Item));
    service.isMutant(row.dna).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it("should get false on service", (done) => {
    const row = {
      dna: ["TTGCAA", "CAGTGC", "TTATGT", "AGAAGG", "CGCCTA", "TCACTG"],
      isMutant: false,
    };
    const Item = {
      id: "",
      dna: "",
      isMutant: false,
    };

    const result = Promise.resolve(row);
    createRowDynamoSpy.and.returnValue(result);
    saveSpy.and.returnValue(Promise.resolve(Item));
    service.isMutant(row.dna).then((result) => {
      expect(result).toEqual(false);
      done();
    });
  });

  //   it("should get an erro on dynamo  ", (done) => {
  //     const row = {
  //       dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
  //       isMutant: true,
  //     };
  //     const result = Promise.resolve(row);
  //     createRowDynamoSpy.and.returnValue(result);
  //     saveSpy.and.returnValue(Promise.reject({ error: "error on dynamo" }));
  //     service.isMutant(row.dna).catch((err) => {
  //       expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND);
  //       done();
  //     });
  //   });
});
