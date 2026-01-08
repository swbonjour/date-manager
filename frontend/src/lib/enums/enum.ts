import { ActivityTypeEnum } from '$lib/utils/client';

export enum MenuItem {
	TODO = 'todo',
	DASHBOARD = 'dashboard',
	PEOPLE = 'people',
	CHAT = 'chat',
	SCHEDULE = 'schedule'
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
