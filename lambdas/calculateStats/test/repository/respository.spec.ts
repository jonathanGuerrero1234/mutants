import "reflect-metadata";

import { DynamoImplService } from "../../src/repository/dynamo-impl.service";
import { DynamoService } from "../../src/repository/dynamo.service";
import AWS from "aws-sdk";

describe("DynamoDB adapter test", async () => {
  let adapter: DynamoService;

  const serviceSpy = jasmine.createSpyObj("dynamo", ["get"]);
  const getSpy = serviceSpy.get as jasmine.Spy;

  const row = {
    dna: {},
    isMutant: true,
  };

  beforeEach(() => {
    adapter = new DynamoImplService();
    AWS.config.update({ region: "us-east-2" });
  });

  it("Handler mutant", () => {
    getSpy.and.returnValue({ promise: () => new Promise((resolve) => resolve(`PutItem succeeded`)) });
    adapter.get().catch((err) => {
      console.log(err);
    });
  });
});
