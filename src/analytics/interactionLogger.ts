export interface InteractionLog {
  ip:       string;
  question: string;
  lang:     string;
  date:     string;
}

const interactionLogs: InteractionLog[] = [];

export async function logInteraction(data: InteractionLog) {
  interactionLogs.push(data);
  if (interactionLogs.length > 100) interactionLogs.shift();
  if (import.meta.env.DEV) {
    console.log('[NachoBot Analytics]', JSON.stringify(data));
  }
}
