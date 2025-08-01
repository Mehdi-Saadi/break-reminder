type Brand<B> = { __brand: B };
export type Branded<A, B> = A & Brand<B>;
