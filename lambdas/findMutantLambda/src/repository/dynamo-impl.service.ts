import { injectable } from "inversify";
import { DynamoService } from "./dynamo.service";
import * as uuid from "uuid";
import { DynamoDB } from "aws-sdk";
import { constants } from "../utils/constants";
import { itemType, rowType } from "../model/types";

@injectable()
export class DynamoImplService implements DynamoService {
  dynamo = new DynamoDB.DocumentClient();

  public save(row: rowType): Promise<itemType> {
    const params = {
      TableName: constants.TABLE,
      Item: {
        id: uuid.v1(),
        dna: row.dna.toString(),
        isMutant: row.isMutant,
      },
    };
    return new Promise((resolve, reject) => {
      this.dynamo
        .put(params)
        .promise()
        .then(() => {
          return resolve(params.Item);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
}
