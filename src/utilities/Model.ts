export default class Model {
  id?: string;
}

export interface Account {
  id: string;
  name: string;
  token: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  appIds: string[];
}
