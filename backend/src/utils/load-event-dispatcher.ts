import { glob } from 'glob';
import { appConfig } from '@base/config/app';
import { MexLogger } from './logger';

/**
 * This loads all the created subscribers into the project, so we do not have to import them manually.
 */
export async function loadEventDispatcher() {
  const patterns = appConfig.appPath + appConfig.eventsDir;

  const files = await glob(patterns);
  for (const file of files) {
    MexLogger.debug("require files", file)
    require(file);
  }
}
