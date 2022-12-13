import { GoogleUserInfo } from './googleauth';

export interface DTUser extends GoogleUserInfo {
  isnew: boolean;
  linked_in?: string;
}
