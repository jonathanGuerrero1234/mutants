import { Container } from "inversify";
import { CalculateStatsController } from "./controller/calculate-stats.controller";
import { CalculateStatsImplService } from "./services/calculate-stats-impl.service";
import { CalculateStatsService } from "./services/calculate-stats.service";
import { CONTROLLERS, SERVICES } from "./utils/constants";
import { DynamoService } from "./repository/dynamo.service";
import { DynamoImplService } from "./repository/dynamo-impl.service";

const AppContainer: Container = new Container();
AppContainer.bind<CalculateStatsController>(CONTROLLERS.CalculateStatsController).to(CalculateStatsController);
AppContainer.bind<CalculateStatsService>(SERVICES.CalculateStatsService).to(CalculateStatsImplService);
AppContainer.bind<DynamoService>(SERVICES.DynamoService).to(DynamoImplService);

export { AppContainer };
