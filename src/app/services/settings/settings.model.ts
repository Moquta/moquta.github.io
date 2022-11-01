import { IAdhanApiCityParams } from '../adhan/adhan.model';

/**
 * @param AdditionalInfo - List of information to show at the bottom of the display. Each item will show in a new line. Example: ['Arabic Khutbah: 12:00 PM']
 * @param AdhkarTimings - How long after iqama time until adhkar shall be displayed for each prayer.
 * @param ApiParams - All the parameters pertaining to getting the data from the API
 * @param IqamaTimings - How long after adhan time iqamah time should be
 * @param MasjidLocation - Name of the masjid's location
 * @param MasjidLogoSrc - Source for logo of the masjid (preferably a local image)
 * @param MasjidName - Name of the masjid
 * @param MasjidPrimaryColor - Primary color for the masjid
 * @param MasjidSecondaryColor - Secondary color for the masjid
 */
export interface IMoqutaSettings {
  AdditionalInfo: Array<string>;
  AdhkarTimings: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  ApiParams: IAdhanApiCityParams;
  IqamaTimings: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  MasjidLocation: string;
  MasjidLogoSrc: string;
  MasjidName: string;
  MasjidPrimaryColor: string;
  MasjidSecondaryColor: string;
}
