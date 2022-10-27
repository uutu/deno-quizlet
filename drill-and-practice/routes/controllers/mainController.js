import * as statisticService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {

  const result = await statisticService.returnServiceStatistics();

  console.log(result);

  render("main.eta", {
    statistics: await statisticService.returnServiceStatistics(),
  });
};

export { showMain };
