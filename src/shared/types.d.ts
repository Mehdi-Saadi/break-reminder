import { UUID } from '@shared/crypto';

type Brand<B> = { __brand: B };
export type Branded<A, B> = A & Brand<B>;

export type BreakMessages = Record<UUID, string>;
