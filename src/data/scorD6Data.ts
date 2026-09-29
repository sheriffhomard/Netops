import { Flashcard } from './workshopsData';
import { scorD6Part1Cards } from './scorD6Part1';
import { scorD6Part2Cards } from './scorD6Part2';

export const scorD6Cards: Flashcard[] = [
  ...scorD6Part1Cards,
  ...scorD6Part2Cards,
];
