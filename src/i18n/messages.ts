import messages from "../../messages/en";

type Join<K extends string, P extends string> = `${K}.${P}`;

type NestedKeys<T> = {
  [K in keyof T & string]: T[K] extends object ? Join<K, NestedKeys<T[K]>> : K;
}[keyof T & string];

export type MessageKey = NestedKeys<typeof messages>;

export type Namespace = keyof typeof messages;