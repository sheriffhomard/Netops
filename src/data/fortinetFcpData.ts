import { Flashcard } from './workshopsData';
import { fortinetFcpPart1Cards } from './fortinetFcpPart1';
import { fortinetFcpPart2Cards } from './fortinetFcpPart2';

export const fortinetFcpCards: Flashcard[] = [
  ...fortinetFcpPart1Cards,
  ...fortinetFcpPart2Cards,
];

export const fcpD1Cards = fortinetFcpCards.filter(c => c.moduleCode === 'FCP-D1');
export const fcpD2Cards = fortinetFcpCards.filter(c => c.moduleCode === 'FCP-D2');
export const fcpD3Cards = fortinetFcpCards.filter(c => c.moduleCode === 'FCP-D3');
export const fcpD4Cards = fortinetFcpCards.filter(c => c.moduleCode === 'FCP-D4');

export {
  fortinetFcpPart1Cards,
  fortinetFcpPart2Cards,
};
