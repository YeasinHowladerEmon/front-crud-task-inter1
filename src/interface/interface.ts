export type IUser = {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar?: string;
  domain: string;
  available: boolean;
};
export type IUserInputs = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar?: string;
  domain: string;
  available: boolean;
};

export type ITeam ={
  _id: string;
  name:string;
  members: IUser[]
}
