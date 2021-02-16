import "reflect-metadata";

import { DynamoImplService } from "../../src/repository/dynamo-impl.service";
import { DynamoService } from "../../src/repository/dynamo.service";
import AWS, { AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";

describe("DynamoDB adapter test", async () => {
  let adapter: DynamoService;

  // AWS.config.update({ region: "us-east-2" });

  const awsConfigSpy = jasmine.createSpyObj("AWS.config", ["update"]);
  const updateSpy = awsConfigSpy.update as jasmine.Spy;

  const serviceSpy = jasmine.createSpyObj("dynamo", ["put"]);
  const putSpy = serviceSpy.put as jasmine.Spy;

  const row = {
    dna: {},
    isMutant: true,
  };

  beforeEach(() => {
    adapter = new DynamoImplService();
    AWS.config.update({ region: "us-east-2" });
  });

  it("Handler mutant", () => {
    putSpy.and.returnValue({ promise: () => new Promise((resolve) => resolve(`PutItem succeeded`)) });
    adapter.save(row).catch((err) => {
      console.log(err);
    });
  });
});
