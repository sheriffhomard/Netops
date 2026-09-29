import { Flashcard } from './workshopsData';
import { scorD4Part1Cards } from './scorD4Part1';
import { scorD4Part2Cards } from './scorD4Part2';

export const scorD4Cards: Flashcard[] = [
  ...scorD4Part1Cards,
  ...scorD4Part2Cards,
];
