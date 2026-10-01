const long = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const short = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

/** "27 May 2026" */
export function formatDate(iso: string): string {
	return long.format(new Date(iso));
}

/** "27 May" — for lists already grouped by year */
export function formatDayMonth(iso: string): string {
	return short.format(new Date(iso));
}

export function yearOf(iso: string): number {
	return new Date(iso).getFullYear();
}
