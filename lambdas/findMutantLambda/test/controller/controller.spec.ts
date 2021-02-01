import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { FindMutantController } from "../../src/controller/find-mutant.controller";
import { Response } from "../../src/model/response.model";
import { FindMutantService } from "../../src/services/find-mutant.service";
import { FindMutantImplService } from "../../src/services/find-mutant-impl.service";

describe("Index test", () => {
  const serviceSpy = jasmine.createSpyObj("FindMutantImplService", ["isMutant"]);

  const isMutantSpy = serviceSpy.isMutant as jasmine.Spy;

  const validatorSpy = jasmine.createSpyObj("RequestValidator", ["validate"]);

  const validateSpy = validatorSpy.validate as jasmine.Spy;

  let controller: FindMutantController;

  beforeEach(() => {
    controller = new FindMutantController(validatorSpy, serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("should get a result mutant true", (done) => {
    const body = {
      dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
    };

    const event = {
      body: body,
      isBase64Encoded: false,
    };

    const array = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
    const result = Promise.resolve(true);
    isMutantSpy.and.returnValue(result);
    validateSpy.and.returnValue(Promise.resolve(array));
    controller.eventHandler(JSON.stringify(event)).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it("should get a result mutant false", (done) => {
    const body = {
      dna: ["TTGCAA", "CAGTGC", "TTATGT", "AGAAGG", "CGCCTA", "TCACTG"],
    };

    const event = {
      body: body,
      isBase64Encoded: false,
    };

    const array = ["TTGCAA", "CAGTGC", "TTATGT", "AGAAGG", "CGCCTA", "TCACTG"];
    const result = Promise.resolve(false);
    isMutantSpy.and.returnValue(result);
    validateSpy.and.returnValue(Promise.resolve(array));
    controller.eventHandler(JSON.stringify(event)).then((result) => {
      expect(result).toEqual(false);
      done();
    });
  });

  it("should get an error in data incomplete", (done) => {
    const body = {
      dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
    };

    const event = {
      body: body,
      isBase64Encoded: false,
    };

    const array = [""];
    const result = Promise.resolve(true);
    isMutantSpy.and.returnValue(result);
    validateSpy.and.returnValue(Promise.resolve(array));
    controller.eventHandler(JSON.stringify(event)).catch((err) => {
      expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND);
      done();
    });
  });

  it("should get an error in data with diferent type", (done) => {
    const body = {
      dna1: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
    };

    const event = {
      body: body,
      isBase64Encoded: false,
    };

    const array = [""];
    const result = Promise.resolve(true);
    isMutantSpy.and.returnValue(result);
    validateSpy.and.returnValue(Promise.resolve(array));
    controller.eventHandler(JSON.stringify(event)).catch((err) => {
      expect(err.statusCode).toEqual(StatusCodes.NOT_FOUND);
      done();
    });
  });
});
