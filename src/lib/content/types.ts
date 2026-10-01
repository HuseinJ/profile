export interface TocEntry {
	level: 'h2' | 'h3';
	title: string;
	id: string;
}

/** Frontmatter of a post in src/posts/*.svx */
export interface PostFrontmatter {
	title: string;
	date: string;
	summary?: string;
	image?: string;
	author?: string;
	tags?: string[];
	series?: string;
	part?: number;
	readingTime?: string;
	tableOfContents?: TocEntry[];
}

export interface Tag {
	key: string;
	label: string;
}

export interface Post {
	slug: string;
	title: string;
	date: string;
	summary?: string;
	image?: string;
	author?: string;
	tags: Tag[];
	series?: { name: string; part?: number };
	readingMinutes: number;
	tableOfContents: TocEntry[];
}
