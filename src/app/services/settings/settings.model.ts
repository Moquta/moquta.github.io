import { IAdhanApiCityParams } from '../adhan/adhan.model';

/**
 * @param AdditionalInfo - List of information to show at the bottom of the display. Each item will show in a new line. Example: ['Arabic Khutbah: 12:00 PM']
 * @param AdhkarTimings - How long after iqama time until adhkar shall be displayed for each prayer.
 * @param ApiParams - All the parameters pertaining to getting the data from the API
 * @param IqamaTimings - How long after adhan time iqamah time should be
 * @param MasjidLogoSrc - Source for logo of the masjid (preferably a local image)
 * @param MasjidName - Name of the masjid
 * @param MasjidPrimaryColor - Primary color for the masjid
 * @param MasjidSecondaryColor - Secondary color for the masjid
 * @param MasjidSubheader - Name of the masjid's location
 */
export interface IMoqutaSettings {
  AdditionalInfo: Array<string>;
  AdhkarTimings: {
    Fajr: number;
    Dhuhr: number;
    Asr: number;
    Maghrib: number;
    Isha: number;
  };
  ApiParams: IAdhanApiCityParams;
  IqamaTimings: {
    Fajr: number;
    Dhuhr: number;
    Asr: number;
    Maghrib: number;
    Isha: number;
  };
  MasjidLogoSrc: string;
  MasjidName: string;
  MasjidPrimaryColor: string;
  MasjidSecondaryColor: string;
  MasjidSubheader: string;
}
