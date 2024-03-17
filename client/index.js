// Check if service workers are supported and available.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
  });
}
const test = 2345;
const publicVapidKey = 'BHw7PLHQh9LdWEepjq4zlSgkPAu13qgOyVp4zNG2BCd_gkKqh6p-JWKdCc5OdUR2VH5g-RgtbYnc3OCxH3x6jsA';

// Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

window.subscribe = async () => {
  if (!('serviceWorker' in navigator)) return alert(`Service Worker not suppoorted`);

  const registration = await navigator.serviceWorker.ready;

  // Subscribe to push notifications
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true, //needs to be true to get approval for push notification
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
};

// window.broadcast = async () => {
//   await fetch('/broadcast', {
//     method: 'GET',
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// };