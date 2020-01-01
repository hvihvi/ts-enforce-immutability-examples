export type Person = {
  name: string;
  age: number;
  sex: Sex;
  civilite: Civilite;
};

export enum Civilite {
  MR = "Monsieur",
  MME = "Madame",
  MLLE = "Mademoiselle"
}

export enum Sex {
  M,
  F
}
