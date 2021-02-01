import { injectable } from "inversify";
import { DynamoService } from "./dynamo.service";
import { DynamoDB } from "aws-sdk";
import { constant } from "../utils/constants";

@injectable()
export class DynamoImplService implements DynamoService {
  dynamo = new DynamoDB.DocumentClient();

  public get(): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: constant.TABLE,
        FilterExpression: "isMutant = :isMutant",
        ExpressionAttributeValues: {
          ":isMutant": true,
        },

        Select: "COUNT",
      };

      this.dynamo
        .scan(params)
        .promise()
        .then((data: any) => {
          console.log("la dataaaaaa repository", data);
          return resolve(data);
        })
        .catch((err: any) => {
          console.log("ell errorrrr repository ---->", err);
          return reject(err);
        });
    });
  }
}
