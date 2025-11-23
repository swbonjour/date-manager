import { ActivityTypeEnum } from './client';

export const capitalizeFirstLetter = (str: string) => {
	return str[0].toLocaleUpperCase() + str.slice(1, str.length);
};

export const acitivtyTypesLoc: Map<ActivityTypeEnum, string> = new Map([
	[ActivityTypeEnum.EDUCATION, 'Учеба'],
	[ActivityTypeEnum.ENTERTAINMENT, 'Развлечение'],
	[ActivityTypeEnum.HOBBY, 'Хобби'],
	[ActivityTypeEnum.SPORT, 'Спорт'],
	[ActivityTypeEnum.WORK, 'Работа']
]);

export const activityTypes: ActivityTypeEnum[] = [
	ActivityTypeEnum.EDUCATION,
	ActivityTypeEnum.ENTERTAINMENT,
	ActivityTypeEnum.HOBBY,
	ActivityTypeEnum.SPORT,
	ActivityTypeEnum.WORK
];
