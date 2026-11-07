import { describe, it, expect } from 'vitest';

export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export interface SRSState {
  cardId: string;
  box: LeitnerBox;
  consecutiveSuccess: number;
  lastReviewedAt: number;
  nextReviewDueAt: number;
}

// Leitner spaced repetition interval scheduler (in hours)
export const LEITNER_INTERVALS_HOURS: Record<LeitnerBox, number> = {
  1: 4,      // Box 1: review in 4 hours
  2: 24,     // Box 2: review tomorrow (24h)
  3: 72,     // Box 3: review in 3 days (72h)
  4: 168,    // Box 4: review in 1 week (168h)
  5: 720,    // Box 5: review in 1 month (720h)
};

export function processCardReview(
  current: SRSState,
  rating: 'again' | 'good' | 'mastered',
  nowMs = Date.now()
): SRSState {
  let nextBox: LeitnerBox = current.box;
  let nextSuccess = current.consecutiveSuccess;

  if (rating === 'again') {
    // Reset to Box 1 on failure
    nextBox = 1;
    nextSuccess = 0;
  } else if (rating === 'good') {
    // Advance by 1 box up to Box 5
    nextBox = Math.min(5, current.box + 1) as LeitnerBox;
    nextSuccess += 1;
  } else if (rating === 'mastered') {
    // Direct advancement to Box 5
    nextBox = 5;
    nextSuccess += 2;
  }

  const intervalHours = LEITNER_INTERVALS_HOURS[nextBox];
  const nextReviewDueAt = nowMs + intervalHours * 3600 * 1000;

  return {
    cardId: current.cardId,
    box: nextBox,
    consecutiveSuccess: nextSuccess,
    lastReviewedAt: nowMs,
    nextReviewDueAt,
  };
}

describe('Leitner SRS Spaced Repetition Engine', () => {
  const initialCard: SRSState = {
    cardId: 'fc-bgp-101',
    box: 1,
    consecutiveSuccess: 0,
    lastReviewedAt: 1700000000000,
    nextReviewDueAt: 1700000000000,
  };

  it('advances box and schedules next review on "good" rating', () => {
    const reviewed = processCardReview(initialCard, 'good', 1700000000000);
    expect(reviewed.box).toBe(2);
    expect(reviewed.consecutiveSuccess).toBe(1);
    expect(reviewed.nextReviewDueAt).toBe(1700000000000 + 24 * 3600 * 1000);
  });

  it('jumps directly to box 5 on "mastered" rating', () => {
    const reviewed = processCardReview(initialCard, 'mastered', 1700000000000);
    expect(reviewed.box).toBe(5);
    expect(reviewed.nextReviewDueAt).toBe(1700000000000 + 720 * 3600 * 1000);
  });

  it('resets back to box 1 on "again" rating from higher box', () => {
    const highBoxCard: SRSState = { ...initialCard, box: 4, consecutiveSuccess: 5 };
    const reviewed = processCardReview(highBoxCard, 'again', 1700000000000);
    expect(reviewed.box).toBe(1);
    expect(reviewed.consecutiveSuccess).toBe(0);
    expect(reviewed.nextReviewDueAt).toBe(1700000000000 + 4 * 3600 * 1000);
  });
});
