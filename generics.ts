// Дженерік в тайпскріпт - це параметризований тип, що дозволяє оголошувати параметри типу, які
// являються тимчасовою заміною конкретних монолітних типів, означення яких буде виконано в момент використання.

// Створення
//interface User<T, J, K> { }
// type User<T> = {}
// class User<T> {}
// function User<T>() {}

// Приклад №1

type UserL = {
  name: string;
  age: number;
};

function identity<T>(arg: T): T {
  return arg;
}

const strn: string = "Hello";
const n: number = 10;

const user2: UserL = {
  name: "Alex",
  age: 20,
};
const r1 = identity(strn);
const r2 = identity(n);
const r3 = identity(user2);

// Приклад №2, щоб не створювати два схожих інтерфейса, використаємо дженерік.
interface UserL1 {
  name: string;
  age: number;
}

interface Message1 {
  id: number;
  text: string;
}

interface State1<T> {
  loading: boolean;
  error: Error | null;
  data: T;
}

type UserState1 = State1<UserL1>;
type MessageState1 = State1<Message1>;

const messageStateData: MessageState1 = {
  loading: false,
  error: null,
  data: {
    id: 4,
    text: "",
  },
};

// Приклад №3

function getRendomElement<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);

  return items[randomIndex];
}

const el1 = getRendomElement([1, 2, 3, 4, 5]);
const el2 = getRendomElement(["1", "2", "3", "4", "5"]);
const el3 = getRendomElement(["1", 2, null, 4, "5"]);

// Приклад №4

function merge<U, V>(objElem1: U, objElem2: V): U & V {
  return {
    ...objElem1,
    ...objElem2,
  };
}

const n1 = merge({ a: 1 }, { b: 2 });
const n2 = merge({ a: "1", c: null }, { b: 2 });

// Приклад №5 в дженеріках можна вказувати параметри певно типу, наприклад, Promise, Array, Record.

async function fakeRequest() {
  return 2;
}

const b4: Promise<number> = fakeRequest();
type Names = Array<string>;
type Obj = Record<string, number>;

// Приклад №6 дженеріки можуть розширяти перні типи через extends

function len<T extends { length: number }>(collection: T) {
  return collection.length;
}

const k1 = len("hello");
const k2 = len([1, 2, 3]);
//const k3 = len(3); // Error

// Приклад №7
class DataCollection<T extends { id: string }> {
  constructor(public data: T[]) {}
  search(id: string): T | null {
    return this.data.find((d) => d.id === id) || null;
  }
}

type User5 = {
  id: string;
  name: string;
};

type Message5 = {
  id: string;
  text: string;
};

const user7: User5 = {
  id: "1",
  name: "Max",
};

const user5 = new DataCollection([user7]);

const message7: Message5 = {
  id: "2",
  text: "text",
};

const message5 = new DataCollection([message7]);
const searchable = message5.search("2");
const searchable1 = user5.search("1");

// Приклад №8

function getValue<T extends object, U extends keyof T>(obj: T, prop: U) {
  return obj[prop];
}

const r8 = getValue({ name: "Max" }, "name");

// Приклад № 9

function getKey<T extends object, U extends keyof T>(
  obj: T,
  value: T[U]
): U | null {
  const key = (Object.keys(obj) as Array<U>).find((k) => obj[k] === value);
  return key || null;
}

const r9 = getKey({ name: "Max" }, "Max");

// Приклад №10

function patchField<T extends object, U extends keyof T>(
  obj: T,
  field: U,
  val: T[U]
): T | null {
  if (obj.hasOwnProperty(field)) {
    obj[field] = val;
  }
  return obj || null;
}

patchField({ f: 1 }, "f", 3);

// Приклад №11

function format<T = string>(s?: T): T | undefined {
  return s;
}

const r10 = format();

// Приклад №12

//React.FC
type FunctionalComponent<T extends object = object> = (
  props: T & { children?: any }
) => any;

const component: FunctionalComponent<{ name: string; age: number }> = ({
  children,
}) => {};
