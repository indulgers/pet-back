/* eslint-disable @typescript-eslint/naming-convention */
export enum LanguageCode {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}

export const supportedLanguageCount = Object.values(LanguageCode).length;
