import { Response } from "../model/response.model";
import { FindMutantService } from "./find-mutant.service";
import { StatusCodes } from "http-status-codes";
import { injectable, inject } from "inversify";
import { SearchMutant } from "../search/search-mutant";
import { DynamoImplService } from "../repository/dynamo-impl.service";
import { SERVICES } from "../utils/constants";
import { rowType } from "../model/types";

@injectable()
export class FindMutantImplService implements FindMutantService {
  constructor(@inject(SERVICES.DynamoService) private dynamo: DynamoImplService) {}

  public isMutant(dna: string[]): Promise<boolean | Response> {
    const searchMutant: SearchMutant = new SearchMutant();
    let row: rowType;
    return new Promise((resolve, reject) => {
      searchMutant
        .search(dna)
        .then((result) => {
          row = this.createRowDynamo(result, dna);
          return this.dynamo.save(row);
        })
        .then(() => {
          if (row.isMutant) {
            return resolve(true);
          } else {
            return resolve(false);
          }
        })
        .catch((err) => {
          console.error("ERROR: ", err);
          return reject(new Response(StatusCodes.NOT_FOUND, { message: err.message }));
        });
    });
  }

  private createRowDynamo(result: boolean, dna: string[]): rowType {
    let row = null;
    if (result) {
      row = {
        dna: dna,
        isMutant: true,
      };
    } else {
      row = {
        dna: dna,
        isMutant: false,
      };
    }
    return row;
  }
}
