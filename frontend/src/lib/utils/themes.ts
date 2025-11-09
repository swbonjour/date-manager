export enum ThemesName {
	LIGHT = 'light',
	DARK = 'dark'
}

export const themes: {
	name: string;
	colors: { primary: string; secondary: string; accent: string; neutral: string };
}[] = [
	{
		name: ThemesName.LIGHT,
		colors: {
			primary: '#ffffff',
			secondary: '#f7f9fa',
			accent: '#8858ff',
			neutral: '#141414'
		}
	},
	{
		name: ThemesName.DARK,
		colors: {
			primary: '#141414',
			secondary: '#2c2c2c',
			accent: '#8858ff',
			neutral: '#f7f9fa'
		}
	}
];
