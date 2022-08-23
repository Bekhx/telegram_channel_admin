import * as express from "express";

function nestedRoutes(this: any, path: any, configure: (arg0: any) => void) {
    const router = express.Router({mergeParams: true});
    this.use(path, router);
    configure(router);
    return router;
}

// @ts-ignore
express.application['prefix'] = nestedRoutes;
// @ts-ignore
express.Router['prefix'] = nestedRoutes;

const expressRouter = express.Router({mergeParams: true});

export const routes = (app: express.Application) => {

    // @ts-ignore
    expressRouter['prefix']('/api', api => {
    })

    app.use(expressRouter);
}