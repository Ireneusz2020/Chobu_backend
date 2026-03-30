export interface StructuredLogMeta {
  [key: string]: unknown;
}

export const logInfo = (message: string, meta: StructuredLogMeta = {}): void => {
  console.log(JSON.stringify({ level: 'info', message, ...meta, ts: new Date().toISOString() }));
};

export const logError = (message: string, meta: StructuredLogMeta = {}): void => {
  console.error(JSON.stringify({ level: 'error', message, ...meta, ts: new Date().toISOString() }));
};
