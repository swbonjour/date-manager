import { writable } from 'svelte/store';
import { themes, ThemesName } from '$lib/utils/themes';

let currentTheme = ThemesName.LIGHT;

const getThemeByName = (name: ThemesName) => themes.find((item) => item.name === name);

export const themeStore = writable({
	...getThemeByName(currentTheme),
	init: () => {
		setRootColors(getThemeByName(currentTheme)!.colors);
	},
	toggle: () => {
		currentTheme = currentTheme === ThemesName.LIGHT ? ThemesName.DARK : ThemesName.LIGHT;
		const theme = getThemeByName(currentTheme);
		themeStore.update((t) => ({ ...t, ...theme }));
		setRootColors(theme!.colors);
	}
});

const setRootColors = (theme: Record<string, string>) => {
	for (const [key, value] of Object.entries(theme)) {
		const cssVar = `--color-${key}`;
		document.documentElement.style.setProperty(cssVar, value);
	}
};
