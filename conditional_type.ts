// Використовуємо значення extends, наприклад,
// T extends U ? T1 : T2
// infer дозволяє визначити змінну в межах нашого обмеження типів, на яку можна посилатись або повертати. Використовуватись
// може після ключового типу

// infer приклад №1
type TryInfer<T extends object = object> = T extends infer R1
  ? R1[keyof R1]
  : never;
type R1 = TryInfer<{ a: 1; b: 2 }>;

// infer приклад №2
function test12() {
  return 2;
}

type FuncRes<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R3
  ? R3
  : any;
type R3 = FuncRes<typeof test12>;
type R4 = ReturnType<typeof test12>; // утіліта

// Приклад №1
type Test<T> = T extends string ? true : false;
type R = Test<"a">;

// Приклад №2
interface User78 {
  id: string;
}

interface Message78 {
  id: number;
}

function getId<T extends { id: any }>(
  obj: T
): T extends { id: string } ? string : number {
  return obj.id;
}

const r14 = getId({} as User78);
const r15 = getId({} as Message78);

// Приклад №3
type NotFalsy<T = null> = T extends null | undefined | false | 0 ? never : T;

let p: NotFalsy<string>;
p = "Hi";

// Приклад №4
type Filter<T, U> = T extends U ? never : T;
type Res = Filter<"a" | "b" | "c", "b">;
type Ex = Exclude<"a" | "b" | "c", "b">; // утіліта

// Приклад №5
type GetStatus<T> = T extends object
  ? T extends { status: string }
    ? T["status"]
    : null
  : null;

type Status = GetStatus<{ status: "STR" }>;
