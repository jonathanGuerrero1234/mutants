export type body = {
  message?: string;
};

export class Response {
  public headers: any;
  public body?: any;

  constructor(public statusCode: number, body: body) {
    this.headers = this.headerBuilder();
    this.body = JSON.stringify(body);
  }

  public headerBuilder(): any {
    return {
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with, X-RqUID",
      "Access-Control-Allow-Method": "POST,GET,OPTIONS",
      "Access-Control-Allow-Origin": "*",
    };
  }
}
