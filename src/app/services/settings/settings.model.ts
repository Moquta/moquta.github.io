import { IAdhanApiCityParams } from '../adhan/adhan.model';

/**
 * @param additionalInfo - List of information to show at the bottom of the display. Each item will show in a new line. Example: ['Arabic Khutbah: 12:00 PM']
 * @param adhkarOffset - How long after iqama time until adhkar shall be displayed for each prayer.
 * @param apiParams - All the parameters pertaining to getting the data from the API
 * @param iqamaOffset - How long after adhan time iqamah time should be
 * @param masjidLogoSrc - Source for logo of the masjid (preferably a local image)
 * @param masjidName - Name of the masjid
 * @param masjidPrimaryColor - Primary color for the masjid (used to highlight current prayer row)
 * @param masjidSecondaryColor - Secondary color for the masjid (use for font on highlight)
 * @param masjidSubheader - Information to show under masjid name
 */
export interface IMoqutaSettings {
  additionalInfo: Array<string>;
  adhkarOffset: IPrayers;
  apiParams: IAdhanApiCityParams;
  iqamaOffset: IPrayers;
  masjidLogoSrc: string;
  masjidName: string;
  masjidPrimaryColor: string;
  masjidSecondaryColor: string;
  masjidSubheader: string;
  language: 'ar' | 'en';
}

export interface IPrayers {
  Fajr: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Isha: number;
}
