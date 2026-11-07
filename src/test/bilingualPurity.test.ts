import { describe, it, expect } from 'vitest';
import {
  generateFullExamQuestions,
  getLocalizedLabScenario,
  bankQuestionsFr,
  bankQuestionsEn,
} from '../data/mockData';

describe('Bilingual Pedagogical Synchronization', () => {
  it('generates 102 fully synchronized questions in French and English', () => {
    const questionsFr = generateFullExamQuestions('fr');
    const questionsEn = generateFullExamQuestions('en');

    expect(questionsFr.length).toBe(102);
    expect(questionsEn.length).toBe(102);

    // Verify first question statement is localized
    expect(questionsFr[0].statement.toLowerCase()).toContain('scénario');
    expect(questionsEn[0].statement.toLowerCase()).toContain('scenario');

    // Verify query is localized
    expect(questionsFr[0].questionQuery).toContain('Quelle action');
    expect(questionsEn[0].questionQuery).toContain('Which');

    // Verify explanations exist and are localized
    expect(questionsFr[0].explanation).toContain('Cisco');
    expect(questionsEn[0].explanation).toContain('Cisco');
  });

  it('provides bilingual virtual lab scenario with matching task count', () => {
    const labFr = getLocalizedLabScenario('fr');
    const labEn = getLocalizedLabScenario('en');

    expect(labFr.tasks.length).toBe(4);
    expect(labEn.tasks.length).toBe(4);

    expect(labFr.title).toContain('Configuration d\'un Trunk');
    expect(labEn.title).toContain('Trunk Configuration');

    expect(labFr.tasks[0].title).toContain('TÂCHE 01');
    expect(labEn.tasks[0].title).toContain('TASK 01');
  });

  it('provides synchronized question bank items in French and English', () => {
    expect(bankQuestionsFr.length).toBe(bankQuestionsEn.length);
    expect(bankQuestionsFr.length).toBeGreaterThanOrEqual(4);

    expect(bankQuestionsFr[0].options.length).toBe(bankQuestionsEn[0].options.length);
    expect(bankQuestionsFr[0].correctAnswer).toBe(bankQuestionsEn[0].correctAnswer);
  });
});
