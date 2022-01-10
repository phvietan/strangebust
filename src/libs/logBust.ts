import { errorLog, log, successLog } from '@drstrain/drutil';
import { getBustOpt } from './bust';

export function logBust(msg: string, force: boolean = false) {
  const { verbose, output } = getBustOpt();
  if (verbose || force) {
    log(msg, output);
  }
}

export function successLogBust(msg: string, force: boolean = false) {
  const { verbose, output } = getBustOpt();
  if (verbose || force) {
    successLog(msg, output);
  }
}

export function errorLogBust(msg: string, force: boolean = false) {
  const { verbose, output } = getBustOpt();
  if (verbose || force) {
    errorLog(msg, output);
  }
}
