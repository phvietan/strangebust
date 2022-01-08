import { errorLog, log, successLog } from '@drstrain/drutil';
import { getBustOpt } from './bust';

export function logVerbose(msg: string, force: boolean = false) {
  const { verbose } = getBustOpt();
  if (verbose || force) log(msg);
}

export function successLogVerbose(msg: string, force: boolean = false) {
  const { verbose } = getBustOpt();
  if (verbose || force) successLog(msg);
}

export function errorLogVerbose(msg: string, force: boolean = false) {
  const { verbose } = getBustOpt();
  if (verbose || force) errorLog(msg);
}
