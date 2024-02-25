// Літеральні типи в тайпскріпт це більш конкретні типи рідків, чисел або логічних значень.

// Приклад №1 Літеральні типи.

type Role = "Admin";
const currentRole: Role = "Admin";

type Roles = "Admin" | "User" | "Moderator";
const currentRoles: Roles = "Admin";

// Приклад №2

interface User {
  name: string;
  age: number;
}

//type UserKeys = keyof User;
type UserKeys = "name" | "age";
let prop: UserKeys;
prop = "name";

//Приклад №3 оператор keyof вивод тільки public, але не виводить (static, private, protected)

class Person {
  name: string = "";
  age: number = 0;
}

let personField: keyof Person = "age";

// Приклад №4

const message10 = {
  id: 1,
  text: "text",
};

const t = typeof message10;

type MessageType10 = typeof message10;

const userMessage: MessageType10 = {
  id: 123,
  text: "text",
};

// Приклад №5
const message11 = {
  id: 1,
  text: "text",
};

type MessageType11 = typeof message11;
type MessageKeysі11 = keyof MessageType11;

// Приклад №6
enum Colors {
  white = "#fff",
  black = "000",
}

type AvailableColors = keyof typeof Colors;

let color: AvailableColors = "white";

//Приклад №7

const formData12 = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};

// interface ValidationResult {
//   firstName: boolean;
//   lastName: boolean;
//   age: boolean;
// }

// type ValidationResult = {
//   [key in keyof typeof formData12]: boolean;
// };

declare function validate<T>(data: T): { [key in keyof T]: boolean };

const r12 = validate(formData12);
const r13 = validate({ message: "text" });
