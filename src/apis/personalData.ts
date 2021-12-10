import { NinInfo } from "reducers/Nins";
import { LadokData } from "./eduidLadok";

/*
 * Code and data structures for talking to the eduid-personal_data backend microservice.
 */
export interface AllUserData {
  display_name?: string;
  emails: PDEmail[];
  eppn: string;
  given_name?: string;
  language?: string;
  nins: NinInfo[];
  phones: PDPhone[];
  surname?: string;
  orcid?: PDOrcid;
  ladok?: LadokData;
}

export interface PDEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export interface PDPhone {
  number: string;
  primary: boolean;
  verified: boolean;
}

export interface PDOrcid {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
}
