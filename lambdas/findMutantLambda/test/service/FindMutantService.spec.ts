import "reflect-metadata";
import { FindMutantService } from "../../src/services/find-mutant.service";
import { FindMutantImplService } from "../../src/services/find-mutant-impl.service";


describe("FindMutantService test", () => {
  const dynamoSpy = jasmine.createSpyObj("DynamoImplService", ["save", "createRowDynamo", "findMutan"]);

  const saveSpy = dynamoSpy.save as jasmine.Spy;
  const findMutanSpy = dynamoSpy.findMutan as jasmine.Spy;
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

  it("should get true on top on service", (done) => {
    const row = {
      dna: ["ATGCGA", "AAGTGC", "ATATGT", "AGAAGG", "CCTCTA", "TCACTG"],
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
    findMutanSpy.and.returnValue(Promise.resolve(true));
    service.isMutant(row.dna).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it("should get true on diagonal on service", (done) => {
    const row = {
      dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCYCTA", "TCACTG"],
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
    findMutanSpy.and.returnValue(Promise.resolve(true));
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


});
