import { ApiProperty } from '@nestjs/swagger';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

const getEnumNameFromTypeFn = (fn: () => StandardEnum<unknown>): string =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  fn
    .toString()
    .replace(/(?:\s|return|{|}|\(|\)|\$|_|,|;|\d)+/gm, '')
    .replace(/^[^A-Z]+/, '')
    .split('=>')
    .pop()
    .split('.')
    .pop();

export const ApiEnumProperty = <T extends StandardEnum<unknown>>(
  func: () => T,
  params?: { isArray?: boolean },
) =>
  ApiProperty({
    enum: func(),
    enumName: getEnumNameFromTypeFn(func),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    'x-enumNames': getEnumKeys(func()),
    isArray: params?.isArray,
  });

export function getEnumKeys(enumType: SwaggerEnumType): string[] | number[] {
  if (Array.isArray(enumType)) {
    return enumType as string[];
  }
  if (typeof enumType !== 'object') {
    return [];
  }

  const numericValues = Object.values(
    enumType as Record<number, string | number>,
  )
    .filter((value) => typeof value === 'number')
    .map((value) => value.toString());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    Object.keys(enumType)
      .filter((key) => !numericValues.includes(key))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .map((key: any) => key)
  );
}
