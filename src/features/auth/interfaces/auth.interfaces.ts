 export interface FindOrCreateUserInput {
  uid: string;
  email: string;
  name?: string;
  photoUrl?: string;
  provider: string;
}