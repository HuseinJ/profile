export const site = {
	name: 'Husein Jusic',
	url: 'https://hjusic.com',
	image: '/profile.jpeg',
	jobTitle: 'Software Engineer',
	description: 'Software engineer. I build backend systems and spend a lot of time thinking about how they get attacked.',
	about: 'Software engineer. I build backend systems and spend a lot of time thinking about how they get attacked.',
	github: 'HuseinJ',
	linkedin: 'husein-jusic-7b0680165',
	knowsAbout: [
		'Cybersecurity',
		'Application Security',
		'Identity and Access Management',
		'Software Architecture',
		'Spring Boot',
		'Kubernetes',
		'OIDC',
		'Domain-Driven Design',
		'Backend Development',
		'Java'
	]
} as const;

/** Profile URLs for structured data; markup writes them out literally so the linter can see they're external. */
export const links = {
	github: `https://github.com/${site.github}`,
	linkedin: `https://www.linkedin.com/in/${site.linkedin}`
} as const;

export function absoluteUrl(path: string): string {
	return path.startsWith('http') ? path : `${site.url}${path}`;
}
