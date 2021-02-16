import { RequestValidator } from "../../../findMutantLambda/src/utils/request-validator";
import * as schema from "../../../findMutantLambda/src/resources/schema-request.json";
describe("Requestvalidator", () => {
  const request = {
    dnsa: ["YTCTAGTA", "TCGAGTAG", "CGCGTAGT", "GAAGAAAC", "GATCTATA", "GAGTCGAT", "AGAGTCGT", "CGAGTAGT"],
  };
  const requestValid = {
    dna: ["YTCTAGTA", "TCGAGTAG", "CGCGTAGT", "GAAGAAAC", "GATCTATA", "GAGTCGAT", "AGAGTCGT", "CGAGTAGT"],
  };

  let validator: RequestValidator;

  beforeEach(() => {
    validator = new RequestValidator();
  });

  it("should create a validator", () => {
    expect(validator).toBeDefined();
  });

  it("request ok", (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    validator.validate(requestValid, schema).then((result) => {
      expect(result[0]).toEqual("YTCTAGTA");
      done();
    });
  });

  it("request ok", (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validator.validate(request, schema).catch((err) => {
      expect(err.statusCode).toEqual(404);
      done();
    });
  });
});
