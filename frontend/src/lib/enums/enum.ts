import { ActivityTypeEnum } from '$lib/utils/client';

export enum MenuItem {
	TODO = 'todo',
	DASHBOARD = 'dashboard',
	PEOPLE = 'people',
	CHAT = 'chat',
	SCHEDULE = 'schedule'
}

export enum ProfileMenuItem {
	PROFILE = 'profile',
	SETTINGS = 'settings'
}

export const ActivityTypeTranslation = {
	[ActivityTypeEnum.ENTERTAINMENT]: 'Развлечение',
	[ActivityTypeEnum.HOBBY]: 'Хобби',
	[ActivityTypeEnum.SPORT]: 'Спорт',
	[ActivityTypeEnum.WORK]: 'Работа',
	[ActivityTypeEnum.EDUCATION]: 'Образование'
};

export const ActivityTypeColors = {
	[ActivityTypeEnum.ENTERTAINMENT]: '#FF7DA9',
	[ActivityTypeEnum.HOBBY]: '#FF9A5A',
	[ActivityTypeEnum.SPORT]: '#6FEE95',
	[ActivityTypeEnum.WORK]: '#8858FF',
	[ActivityTypeEnum.EDUCATION]: '#50CAFF'
};

export const AcitivityTypeDarkColors = {
	[ActivityTypeEnum.ENTERTAINMENT]: '#ed4a80',
	[ActivityTypeEnum.HOBBY]: '#ff8438',
	[ActivityTypeEnum.SPORT]: '#4ae077',
	[ActivityTypeEnum.WORK]: '#6732ed',
	[ActivityTypeEnum.EDUCATION]: '#2caee5'
};
