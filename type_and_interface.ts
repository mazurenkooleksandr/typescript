// Різниця між Type та Interface
// 1. Різниця в синтаксисі: інтрфейс схожий на клас, а тип на обєкт, коли ми описуємо.
// 2. Не можна за допомогою інтерфейсу описати примітивні типи, тільки через аліас type.
// 3. Не можна через інтерфейс описати тип кортежа. Кортеж - це масив певного розміру довжина, якого не змінюється і виступає, як константа в світі масивів.
// 4. Не можливо з union написати інтерфейси тільки з type.
// 5. Типи не можуть оголошенні декілька разів, тобто їх назва, а інтерфейс можна, якщо оголосиш із тією самою назвою він - обєднається.

// Коли використовувати інтерфейси або типи?
// Інтерфейси ми використовуємо для доменної логіки нашого додатку, а саме для обєктів, які повертаються з API.
// А типи використовуємо для взаємодії з цими інтерфейсами і в компонентах.

// Інтерфейс та тип можна використовувати для описання властивостей обєктів

interface UserA {
  name: string;
  age: number;
}

type UserB = {
  name: string;
  age: number;
};

const user: UserA = {
  name: "Alex",
  age: 30,
};

// Функції

interface SumA {
  (a: number, b: number): number;
}

type SumB = (a: number, b: number) => number;

const summary: SumA = (a, b) => a + b;

// Можна унаслідуватись інтерфейсу від типу
type B = {
  name: string;
};

interface A extends B {
  age: number;
}

const b: A = {
  name: "Alex",
  age: 30,
};

// Для примітивного типу, варто викоритовувати тільки аліас type. Тільки для примітивів!

type UniqueId = string;

// Якщо для масивів, то можна type і interface використовувати.
type NamesA = string[];

interface NamesB {
  [key: number]: string;
}

// Кортеж

type State = [number, (n: number) => void];

const s: State = [3, (n) => {}];

// Юніон(Union) можна написати тільки з type з інтерфейсом так не вийде

type K = {
  age: number;
};

type L = {
  name: string;
};

type M = K | L;

const obj: M = {
  name: "Alex",
  age: 30,
};

// Auto Merge обєднання інтерфейсів

interface V {
  name: string;
}

interface V {
  age: number;
}

const g: V = {
  name: "Alex",
  age: 30,
};
