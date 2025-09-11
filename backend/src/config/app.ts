import { env } from '../utils/env';

function getAppPath() {
    let currentDir = __dirname;
    currentDir = currentDir.replace('/config', '');

    return currentDir;
}
const appConfigProd = {
    node: 'development',
    isProduction:false,
    isStaging:false,
    isDevelopment:true,
    name: 'bacarotruck',
    port: 3001,
    routePrefix: '/api',
    url: 'http://localhost:3001',
    appPath: getAppPath(),

    // cronJobsEnabled: toBool(env('ENABLE_CRON_JOBS')),
    // graphqlEnabled: toBool(env('ENABLE_GRAPHQL')),

    // entitiesDir: env('TYPEORM_ENTITIES_DIR'),
    controllersDir: '/api/controllers/**/*Controller{.ts,.js}',
    // cronJobsDir: env('CRON_JOBS_DIR'),
    middlewaresDir: '/infrastructure/middlewares/{.ts,.js}',
    eventsDir:  '/api/events/**/*{.ts,.js}',
    // subscribersDir: env('SUBSCRIBERS_DIR'),
    // resolversDir: env('RESOLVERS_DIR'),
};
const appConfigEnv = {
    node: env('NODE_ENV') || 'development',
    isProduction: env('NODE_ENV') === 'production',
    isStaging: env('NODE_ENV') === 'staging',
    isDevelopment: env('NODE_ENV') === 'development',
    name: env('APP_NAME'),
    port: Number(env('APP_PORT')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    url: env('APP_URL'),
    appPath: getAppPath(),

    cronJobsEnabled: true,
    // graphqlEnabled: toBool(env('ENABLE_GRAPHQL')),

    // entitiesDir: env('TYPEORM_ENTITIES_DIR'),
    controllersDir: '/api/controllers/**/*Controller{.ts,.js}',
    cronJobsDir: '/api/cron-jobs/**/*CronJob{.ts,.js}',
    middlewaresDir: '/infrastructure/middlewares/{.ts,.js}',
    eventsDir:  '/api/events/**/*{.ts,.js}',
    // subscribersDir: env('SUBSCRIBERS_DIR'),
    // resolversDir: env('RESOLVERS_DIR'),
};


export const appConfig = { ...appConfigEnv }