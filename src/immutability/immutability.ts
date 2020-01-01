import { Person, Sex, Civilite } from "./types";

// BAD ❌
// array mutation example 1
export const addFoo1 = (names: string[]) => {
  names.push("foo");
};

// GOOD ✅
// same solution without mutation
export const addFoo = (names: string[]) => {
  return [...names, "foo"];
};

// BAD ❌
// object mutation example 1
export const addAge1 = (person: Person) => {
  person.age = person.age + 1;
  return person;
};

// GOOD ✅
// same solution without mutation
const addAge = (person: Person) => {
  return { ...person, age: person.age + 1 };
};

// BAD ❌
// inner mutation with logic
const addGender1 = (personWithoutGender: Person, married: boolean) => {
  const person = { ...personWithoutGender }; // initialising early is a sign for future mutations
  if (person.sex === Sex.M) {
    person.civilite = Civilite.MR; // "setter" intent
  }
  if (person.sex === Sex.F) {
    person.civilite = married ? Civilite.MME : Civilite.MLLE;
  }
  return person; // no side effects, but inner mutations make it hard to understad "gender"'s value because it changes over tiem
};

// GOOD ✅
// no inner mutation with logic, return the value instead of mutating
const addGender = (personWithoutGender: Person, married: boolean) => {
  return {
    ...personWithoutGender,
    gender: mapGender(personWithoutGender, married)
  };
};
// GOOD ✅
// extracted pure function, easily testable
const mapGender = (person: Person, married: boolean) => {
  if (person.sex === Sex.M) {
    return Civilite.MR; // return the value instead of setting it
  }
  if (person.sex === Sex.F) {
    return married ? Civilite.MME : Civilite.MLLE;
  }
};

// BAD ❌
// switch case with inner mutation
const switchCaseExample1 = (input: string) => {
  let output = null;
  switch (input) {
    case "1":
      output = input + "one";
      break;
    case "2":
      output = input + "two";
      break;
  }
  return output;
};

// GOOD ✅
// create more pure functions if needed, better dataflow
const switchCaseExample = (input: string) => {
  switch (input) {
    case "1":
      return map1(input);
    case "2":
      return map2(input);
  }
};
const map1 = (input: string) => input + "one";
const map2 = (input: string) => input + "two";
