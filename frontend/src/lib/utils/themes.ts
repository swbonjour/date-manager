export enum ThemesName {
	LIGHT = 'light',
	DARK = 'dark'
}

export const themes: {
	name: string;
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		neutral: string;
		work: string;
		education: string;
		hobby: string;
		entertainment: string;
		sport: string;
		shadow: string;
	};
}[] = [
	{
		name: ThemesName.LIGHT,
		colors: {
			primary: '#ffffff',
			secondary: '#f7f9fa',
			accent: '#8858ff',
			neutral: '#141414',

			work: '#8e80f9',
			education: '#50caff',
			hobby: '#ff7da9',
			entertainment: '#6fee95',
			sport: '#ff9a5a',

			shadow: 'rgba(34, 60, 80, 0.2)'
		}
	},
	{
		name: ThemesName.DARK,
		colors: {
			primary: '#141414',
			secondary: '#2c2c2c',
			accent: '#8858ff',
			neutral: '#f7f9fa',

			work: '#8e80f9',
			education: '#50caff',
			hobby: '#ff7da9',
			entertainment: '#6fee95',
			sport: '#ff9a5a',
			shadow: 'rgba(215, 220, 223, 0.8)'
		}
	}
];
