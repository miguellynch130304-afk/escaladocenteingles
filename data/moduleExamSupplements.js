import { historicalModuleExamSupplements } from 'data/historicalModuleExamSupplements';

const baseModuleExamSupplements = {
  'present-simple': {
    questionIds: [80, 109],
    examSentences: [
      {
        text: 'First, yogurt is full of probiotics, which can help boost the immune system.',
        source: 'Supplement Q49',
        function: 'General fact expressed with the Present Simple.'
      },
      {
        text: 'Carbohydrates in yogurt provide energy.',
        source: 'Supplement Q55',
        function: 'Scientific fact with a plural subject and a base verb.'
      }
    ]
  },
  'present-continuous': {
    questionIds: [96, 106],
    examSentences: [
      {
        text: 'The students are participating in a speaking activity while the teacher is monitoring.',
        source: 'Supplement Q36',
        function: 'Two actions happening during the current classroom activity.'
      },
      {
        text: 'You might be looking for anything to get rid of a cold.',
        source: 'Supplement Q46',
        function: 'Progressive form describing a temporary action around now.'
      }
    ]
  },
  'past-simple': {
    questionIds: [84, 116],
    examSentences: [
      {
        text: 'I saw the movie yesterday, and I loved it.',
        source: 'Supplement Q24',
        function: 'Specific Time in the Past.'
      },
      {
        text: 'The soundtrack and the special effects impressed me.',
        source: 'Supplement Q24',
        function: 'Storytelling / Sequence.'
      }
    ]
  },
  'past-continuous': {
    questionIds: [84, 97],
    examSentences: [
      {
        text: 'The students were listening to a conversation about a movie.',
        source: 'Supplement Q24',
        function: 'Background classroom action in progress.'
      },
      {
        text: 'The teacher was monitoring while the students were speaking.',
        source: 'Supplement Q36',
        function: 'Two simultaneous actions in progress in the past.'
      }
    ]
  },
  'present-perfect': {
    questionIds: [86, 95],
    examSentences: [
      {
        text: 'The students have answered questions about the text they have just read.',
        source: 'Supplement Q26',
        function: 'Recent completed actions connected to the present.'
      },
      {
        text: 'They have gone through challenging situations.',
        source: 'Supplement Q35',
        function: 'Life experience without a finished past time.'
      }
    ]
  },
  'perfect-sequencing': {
    questionIds: [89, 95],
    examSentences: [
      {
        text: 'The students have been practicing how to greet and introduce people.',
        source: 'Supplement Q29',
        function: 'An activity continuing from the recent past to the present.'
      },
      {
        text: 'The women had reduced inflammatory markers in their blood.',
        source: 'Supplement Q56',
        function: 'Past perfect form marking an earlier completed result.'
      }
    ]
  },
  'future-forms': {
    questionIds: [68, 101],
    examSentences: [
      {
        text: 'The students are going to write an e-mail about their vacation plans.',
        source: 'Supplement Q8',
        function: 'Be going to introduces an intended future action.'
      },
      {
        text: "I wouldn't be surprised if that happened.",
        source: 'Supplement Q41',
        function: 'Would expresses a tentative prediction.'
      }
    ]
  },
  modals: {
    questionIds: [62, 107],
    examSentences: [
      {
        text: 'Should tablets replace textbooks in high schools?',
        source: 'Supplement Q2',
        function: 'Should opens a discussion about recommendation or desirability.'
      },
      {
        text: 'You may want to add yogurt to your list of remedies.',
        source: 'Supplement Q47',
        function: 'May expresses a tentative suggestion.'
      }
    ]
  },
  imperatives: {
    questionIds: [67, 104],
    examSentences: [
      {
        text: 'Exchange your text with another classmate.',
        source: 'Supplement Q44',
        function: 'Imperative used to give a clear classroom instruction.'
      },
      {
        text: 'Read the text and add some recommendations.',
        source: 'Supplement Q44',
        function: 'Sequence of classroom commands using base verbs.'
      }
    ]
  },
  'gerunds-infinitives': {
    questionIds: [106, 117],
    examSentences: [
      {
        text: 'You might be looking for a way to get rid of a cold.',
        source: 'Supplement Q46',
        function: 'Looking is the -ing form after be.'
      },
      {
        text: 'Yogurt might be helpful in fighting off cold symptoms.',
        source: 'Supplement Q57',
        function: 'Fighting is a gerund after the preposition in.'
      }
    ]
  },
  determiners: {
    questionIds: [77, 108],
    examSentences: [
      {
        text: 'This blouse is beautiful, and those jeans are expensive.',
        source: 'Supplement Q17',
        function: 'This and those identify singular and plural nouns at different distances.'
      },
      {
        text: 'There are some things in yogurt that may be advantageous.',
        source: 'Supplement Q48',
        function: 'Some introduces an indefinite plural quantity.'
      }
    ]
  },
  'question-forms': {
    questionIds: [87, 84],
    examSentences: [
      {
        text: 'How did you like the movie?',
        source: 'Supplement Q24',
        function: 'Past information question with did + subject + base verb.'
      },
      {
        text: 'Could you say that again, please?',
        source: 'Supplement Q2',
        function: 'Polite clarification question with could.'
      }
    ]
  },
  'teaching-skills': {
    questionIds: [61, 82],
    examSentences: [
      {
        text: 'Students complete an article with appropriate signal and reference words.',
        source: 'Supplement Q1',
        function: 'Focused practice develops cohesion before independent writing.'
      },
      {
        text: 'The opening activity activates prior knowledge and engages learners.',
        source: 'Supplement Q22',
        function: 'A purposeful warm-up prepares students for the lesson.'
      }
    ]
  }
};

const moduleIds = [...new Set([
  ...Object.keys(baseModuleExamSupplements),
  ...Object.keys(historicalModuleExamSupplements)
])];

export const moduleExamSupplements = Object.fromEntries(
  moduleIds.map((moduleId) => {
    const base = baseModuleExamSupplements[moduleId] || { questionIds: [], examSentences: [] };
    const historical = historicalModuleExamSupplements[moduleId] || { questionIds: [], examSentences: [] };

    return [
      moduleId,
      {
        questionIds: [...new Set([...base.questionIds, ...historical.questionIds])],
        examSentences: [...base.examSentences, ...historical.examSentences]
      }
    ];
  })
);
