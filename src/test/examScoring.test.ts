import { describe, it, expect } from 'vitest';

export interface ExamScoreCalculation {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  passingScore: number;
  passed: boolean;
  percentage: number;
}

export function computeExamScore(
  totalQuestions: number,
  correctAnswers: number,
  passingScore = 825
): ExamScoreCalculation {
  if (totalQuestions <= 0) throw new Error('Total questions must be greater than zero');
  const clampedCorrect = Math.max(0, Math.min(totalQuestions, correctAnswers));
  const percentage = Math.round((clampedCorrect / totalQuestions) * 100);
  // Cisco scaled scoring: base 300 to 1000
  const score = Math.round(300 + (clampedCorrect / totalQuestions) * 700);
  const passed = score >= passingScore;

  return {
    totalQuestions,
    correctAnswers: clampedCorrect,
    score,
    passingScore,
    passed,
    percentage,
  };
}

describe('Exam Scoring & Proctoring Threshold Engine', () => {
  it('correctly calculates pass when score exceeds official 825 threshold', () => {
    // 90 out of 102 correct
    const result = computeExamScore(102, 90, 825);
    expect(result.score).toBeGreaterThanOrEqual(825);
    expect(result.passed).toBe(true);
    expect(result.percentage).toBe(88);
  });

  it('correctly calculates fail when score falls below 825 threshold', () => {
    // 50 out of 102 correct
    const result = computeExamScore(102, 50, 825);
    expect(result.score).toBeLessThan(825);
    expect(result.passed).toBe(false);
  });

  it('handles edge case of 100% correct answers (1000/1000)', () => {
    const result = computeExamScore(102, 102, 825);
    expect(result.score).toBe(1000);
    expect(result.percentage).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('handles edge case of 0% correct answers (300/1000 base)', () => {
    const result = computeExamScore(102, 0, 825);
    expect(result.score).toBe(300);
    expect(result.percentage).toBe(0);
    expect(result.passed).toBe(false);
  });
});
