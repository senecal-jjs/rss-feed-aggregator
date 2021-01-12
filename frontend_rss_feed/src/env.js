export const isEnvProd =
  typeof window !== 'undefined' &&
  window.location &&
  window.location.hostname.indexOf('seymore.fyi') > -1 &&
  window.location.hostname.indexOf('test') < 0;