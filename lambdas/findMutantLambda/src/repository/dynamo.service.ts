export interface DynamoService {
  save(row: any): Promise<any>;
}
