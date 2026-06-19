// Request permission and return true if granted
export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }
  if (Notification.permission === "granted") {
    return true;
  }
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
}

// Show a notification (permission must be granted first)
export function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/icon.png" });
  }
}