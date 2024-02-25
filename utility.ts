// Readonly
// додає кожному члену обєкта модифікатор readonly
// робить їх доступними тільки для читання

type Task = Readonly<{
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
}>;

const task: Task = {
  id: 0,
  text: "text",
};

function completeTask(task: Task) {
  //task.isCompleted = true;
  //task.completedDate = new Date();
}

completeTask(task);

// Partial
// дозволяє робити всі поля обєкту опціональними

type Task1 = {
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
};

// type optionalTask = Partial<Task1>;

const task1: Task1 = {
  id: 0,
  text: "text",
};

function update(task: Task1, patch: Partial<Task1>): Task1 {
  return {
    ...task,
    ...patch,
  };
}

update(task1, { text: "text" });

// Required
// робить усі поля обовязковими

type Task2 = {
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
};

const task2: Task2 = {
  id: 0,
  text: "text",
};

function getCompleted(tasks: Task2[]) {
  return tasks.filter(
    (t) => t.isCompleted && t.completedDate
  ) as Required<Task2>[];
}

const tasks = getCompleted([task2]);
tasks[0].isCompleted;

// Pick
// відфільтровує обєктний тип
// вибирає усі поля, які потрібні

type UserSchemaType = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: number;
};

type PublicUserFields = Pick<
  UserSchemaType,
  "username" | "email" | "bio" | "image"
>;

// Omit
// є протилежністю Pick, він відфільтровує обєкт, але віддає, ті поля, які не були прописані в дженеріку.

type UserSchemaType1 = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: number;
};

type PublickUserFields1 = Omit<UserSchemaType1, "hash" | "salt">;

// Record<K, T>
// визначає поля в обєкті
// він приймає два параметри, перший описує тип ключів обєкта, а другий тип значення обєкта
// і на виході ми отримуємо Map тип із ключів описаних першим аргументом і значень другим аргументом.

type Obj2 = Record<string, string>;

type O = Record<"A" | "B" | "C", string>;

type ThemeParams = {
  fontSize: number;
  color: string;
};

type Theme = "light" | "dark";

type AppTheme = Record<Theme, ThemeParams>;

const t8: AppTheme = {
  light: {
    fontSize: 16,
    color: "black",
  },
  dark: {
    fontSize: 18,
    color: "white",
  },
};

// Exclude <K, T>
// виключає із першого типу ознаки властиві другому

type UserSchemaType2 = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: number;
};

type PubclicFields = Exclude<keyof UserSchemaType2, "hash" | "salt">;

// Extract<T, U>
// вираховує спілбні для двох типів ознаки

type Intersection = Extract<"id" | "name", "name">;

type Task3 = {
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
};

type UserSchemaType3 = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: number;
};

type I = Extract<keyof Task3, keyof UserSchemaType3>; // отримує спільний ключ id

// NonNullable
// видаляє null і undefined із передамаємого типу

type T = NonNullable<string | null | undefined>;

type Task4 = {
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
};

function getTaskDate(
  date: Task4["completedDate"]
): NonNullable<Task4["completedDate"]> {
  if (!date) {
    return new Date();
  }
  return date;
}

const task4: Task4 = {
  id: 0,
  text: "text",
};

const resDate = getTaskDate(task4.completedDate);

// ReturnType
// тип повернутого значення із функції

function getInt(n: string) {
  return parseInt(n);
}

type R = ReturnType<typeof getInt>;

function createTask() {
  return {
    id: 1,
    text: "text",
  };
}

type createTaskResult = ReturnType<typeof createTask>;

// Parameters
// отримати тип кортеж а аргументів функції

function getInt1(n: string) {
  return parseInt(n);
}

type Input = Parameters<typeof getInt1>;

// ConstructorParameters
// дозволяє отримати тип данних із аргумента конструктора

class Person {
  constructor(
    public name: string,
    public surname: string,
    public age: number
  ) {}
}

type Input1 = ConstructorParameters<typeof Person>;

// Awaited<T>
// виконує розгортання промісів

declare function fetch(): Promise<string>;

type FetchResult = Awaited<ReturnType<typeof fetch>>;
