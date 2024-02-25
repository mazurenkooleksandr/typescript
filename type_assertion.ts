// Утверждение типов Type Assertion
// Потрібно, щоб компілятор дізнався тип переміної, тому використовують Type Assertion.
// as const обмежує тип поточним значенням

// Приклад const

const chars = ["A", "B", "C"];

const test = {
  user: "Alex",
  age: 20,
  chars,
} as const;

test.chars.push("D"); // push в такому випадку працює. Якщо масив перемістити в середину обєкта, тоді він не працюватиме.

// const test = <const>{
//   user: "Alex",
//   age: 20,
// };

type U = typeof test;

const months = ["January", "February", "March"] as const;

for (let month of months) {
}

//months.push("April"); // якщо as const, то push не працює.

// Приклад №1
let value1: unknown;

value1 = "Max";

const st = (value1 as string).toUpperCase();
const str = (<string>value1).toUpperCase();

// Приклад №2

interface UserData {
  name: string;
  age: number;
}

const obj2: UserData = {} as UserData;
// const obj2: UserData = <UserData>{};

obj2.name = "Alex";
obj2.age = 30;

// Приклад №3

const person = {
  name: "Alex",
  surname: "Lee",
};

const keys = Object.keys(person) as Array<keyof typeof person>;
// const keys = <Array<keyof typeof person>>Object.keys(person);

keys.forEach((k) => {
  person[k];
});

// Приклад №4

const element = document.querySelector("#name") as HTMLInputElement;

const { value } = element;

// Приклад №5

type ErrorMessage = string | string[] | Error;

const apiError: ErrorMessage = JSON.parse(JSON.stringify("[]"));

const formattedMessages = (apiError as string[]).map((el) => el.toUpperCase());
