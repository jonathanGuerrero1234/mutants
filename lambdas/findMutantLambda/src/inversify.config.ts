import { Container } from "inversify";
import { FindMutantController } from "./controller/find-mutant.controller";
import { DynamoService } from "./repository/dynamo.service";
import { DynamoImplService } from "./repository/dynamo-impl.service";
import { FindMutantImplService } from "./services/find-mutant-impl.service";
import { FindMutantService } from "./services/find-mutant.service";
import { CONTROLLERS, SERVICES, UTILS } from "./utils/constants";
import { RequestValidator } from "./utils/request-validator";

const AppContainer: Container = new Container();
AppContainer.bind<FindMutantController>(CONTROLLERS.FindMutantController).to(FindMutantController);
AppContainer.bind<RequestValidator>(UTILS.RequestValidator).to(RequestValidator);
AppContainer.bind<FindMutantService>(SERVICES.FindMutantService).to(FindMutantImplService);
AppContainer.bind<DynamoService>(SERVICES.DynamoService).to(DynamoImplService);

export { AppContainer };
