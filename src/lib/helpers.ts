/* eslint-disable no-promise-executor-return */

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

// format time into minutes and seconds
export function formatTime(seconds: number) {
	if (seconds >= 60) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes} minute${minutes > 1 ? "s" : ""} ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
	}
	return `${seconds} second${seconds !== 1 ? "s" : ""}`;
}
