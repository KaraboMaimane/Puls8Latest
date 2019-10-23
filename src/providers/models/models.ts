export class User{
  role: string;
  name: string;
  email: string;
  surname: string;
  pic: string;
  track: string;
  bio: string;
  city: string;
  fullname: string;
  gender: string;
  genre: string;
  payment: number;
  price: number;
  img: string;
  stagename: string;
}

export class ModelsProvider{

}

export class RegistrationData{
  email: string;
  password: string;
  fullname: string;
  uid: string;
  image = 'https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w'
}

export interface CitySearchResult {
  results: CitySearchResult[];
  title:                string;
  highlightedTitle:     string;
  vicinity?:            string;
  highlightedVicinity?: string;
  position?:            number[];
  category?:            string;
  categoryTitle?:       string;
  bbox?:                number[];
  href:                 string;
  type:                 Type;
  resultType:           ResultType;
  id?:                  string;
  distance?:            number;
  completion?:          string;
}

export enum ResultType {
  Address = "address",
  Place = "place",
  Query = "query",
}

export enum Type {
  UrnNLPTypesAutosuggest = "urn:nlp-types:autosuggest",
  UrnNLPTypesPlace = "urn:nlp-types:place",
}
