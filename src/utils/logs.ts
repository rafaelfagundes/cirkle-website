import firebase from "firebase";

let analytics: firebase.analytics.Analytics;
if (process.browser) analytics = firebase.analytics();

function logEvent(event: string): void {
  if (analytics) analytics.logEvent(event);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function logEventWithParams(event: string, params: any): void {
  if (analytics) analytics.logEvent(event, params);
}

export { logEvent, logEventWithParams };
