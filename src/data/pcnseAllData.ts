import { Flashcard } from './workshopsData';
import { pcnseD1Cards } from './pcnseD1Data';
import { pcnseD2Cards } from './pcnseD2Data';
import { pcnseD3Cards } from './pcnseD3Data';
import { pcnseD4Cards } from './pcnseD4Data';
import { pcnseD5Cards } from './pcnseD5Data';
import { pcnseD6Cards } from './pcnseD6Data';

export const pcnseAllCards: Flashcard[] = [
  ...pcnseD1Cards,
  ...pcnseD2Cards,
  ...pcnseD3Cards,
  ...pcnseD4Cards,
  ...pcnseD5Cards,
  ...pcnseD6Cards,
];

export {
  pcnseD1Cards,
  pcnseD2Cards,
  pcnseD3Cards,
  pcnseD4Cards,
  pcnseD5Cards,
  pcnseD6Cards,
};
