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
