import "reflect-metadata";

import { DynamoImplService } from "../../src/repository/dynamo-impl.service";
import { DynamoService } from "../../src/repository/dynamo.service";

describe("DynamoDB adapter test", async () => {
  let adapter: DynamoService;

  beforeEach(() => {
    adapter = new DynamoImplService();
  });

  it("Test save ok", (done) => {
    adapter["docClient"]["put"] = (params: any, callback) => {
      return { promise: () => new Promise((resolve) => resolve(`PutItem succeeded`)) };
    };
    let msm = "PutItem succeeded";
    adapter.save("dna", true).then((res) => {
      expect(msm).toEqual(res.toString().substring(0, msm.length));
      done();
    });
  });

  it("Test save error connec dynamodb", (done) => {
    adapter["docClient"]["put"] = (params: any, callback) => {
      return { promise: () => new Promise((resolve, reject) => reject(`Error`)) };
    };
    adapter.save("dna", true).catch((err) => {
      console.log("err; ", err);
      expect(err).toEqual("Error");
      done();
    });
  });
});
