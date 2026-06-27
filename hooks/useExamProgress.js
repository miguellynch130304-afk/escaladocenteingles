import { useCallback, useEffect, useMemo, useState } from 'react';
import { examQuestions } from 'data/examQuestions';

const STORAGE_KEY = 'dashui-english-prep-progress-v1';

const defaultProgress = {
  practice: {},
  exam: {},
  examStartedAt: null,
  examFinishedAt: null,
  lastExamScore: null
};

const readStoredProgress = () => {
  if (typeof window === 'undefined') {
    return defaultProgress;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
};

export const calculateScore = (answers, questions = examQuestions) => {
  return questions.reduce((score, question) => {
    return answers?.[question.id] === question.answer ? score + 1 : score;
  }, 0);
};

export const countAnswered = (answers, questions = examQuestions) => {
  return questions.filter((question) => Boolean(answers?.[question.id])).length;
};

const useExamProgress = () => {
  const [progress, setProgress] = useState(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readStoredProgress());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, ready]);

  const updateProgress = useCallback((recipe) => {
    setProgress((current) => {
      const next = typeof recipe === 'function' ? recipe(current) : recipe;
      return { ...defaultProgress, ...current, ...next };
    });
  }, []);

  const setPracticeAnswer = useCallback((questionId, answer) => {
    updateProgress((current) => ({
      practice: { ...current.practice, [questionId]: answer }
    }));
  }, [updateProgress]);

  const setExamAnswer = useCallback((questionId, answer) => {
    updateProgress((current) => ({
      exam: { ...current.exam, [questionId]: answer },
      examFinishedAt: null
    }));
  }, [updateProgress]);

  const startExam = useCallback(() => {
    updateProgress((current) => ({
      exam: current.examFinishedAt ? {} : current.exam,
      examStartedAt: Date.now(),
      examFinishedAt: null,
      lastExamScore: null
    }));
  }, [updateProgress]);

  const finishExam = useCallback(() => {
    updateProgress((current) => ({
      examFinishedAt: Date.now(),
      lastExamScore: calculateScore(current.exam)
    }));
  }, [updateProgress]);

  const resetExam = useCallback(() => {
    updateProgress({
      exam: {},
      examStartedAt: null,
      examFinishedAt: null,
      lastExamScore: null
    });
  }, [updateProgress]);

  const resetPractice = useCallback((questionIds) => {
    updateProgress((current) => {
      if (!questionIds?.length) {
        return { practice: {} };
      }

      const nextPractice = { ...current.practice };
      questionIds.forEach((questionId) => {
        delete nextPractice[questionId];
      });
      return { practice: nextPractice };
    });
  }, [updateProgress]);

  const stats = useMemo(() => {
    const practiceAnswered = countAnswered(progress.practice);
    const practiceScore = calculateScore(progress.practice);
    const examAnswered = countAnswered(progress.exam);
    const examScore = calculateScore(progress.exam);

    return {
      practiceAnswered,
      practiceScore,
      examAnswered,
      examScore,
      practicePercent: Math.round((practiceAnswered / examQuestions.length) * 100),
      examPercent: Math.round((examAnswered / examQuestions.length) * 100)
    };
  }, [progress]);

  return {
    ready,
    progress,
    stats,
    setPracticeAnswer,
    setExamAnswer,
    startExam,
    finishExam,
    resetExam,
    resetPractice
  };
};

export default useExamProgress;
