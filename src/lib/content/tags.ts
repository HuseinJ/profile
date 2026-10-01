import type { Tag } from './types';

/** Posts spell tags inconsistently ("spring-boot", "Spring Boot", "java", "Java"); fold them to one key. */
export function tagKey(raw: string): string {
	return raw.trim().toLowerCase().replace(/[-_\s]+/g, '-');
}

function tagLabel(raw: string): string {
	const spaced = raw.trim().replace(/[-_]+/g, ' ');
	return /[A-Z]/.test(spaced) ? spaced : spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function toTag(raw: string): Tag {
	return { key: tagKey(raw), label: tagLabel(raw) };
}

/** Distinct tags across posts, preferring the label that was written with capitals. */
export function collectTags(lists: Tag[][]): Tag[] {
	const byKey = new Map<string, Tag>();
	for (const tag of lists.flat()) {
		const known = byKey.get(tag.key);
		if (!known || (!/[A-Z]/.test(known.label.slice(1)) && /[A-Z]/.test(tag.label.slice(1)))) {
			byKey.set(tag.key, tag);
		}
	}
	return [...byKey.values()].sort((a, b) => a.label.localeCompare(b.label));
}
