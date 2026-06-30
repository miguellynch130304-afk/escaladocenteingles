// Grammar course built from the provided exam material. Keep this file ASCII-only.
import { moduleExamSupplements } from 'data/moduleExamSupplements';

const grammarModuleLibrary = [
  {
    id: 'present-simple',
    order: 1,
    title: 'Present Simple',
    level: 'Base',
    focus: 'Habits, permanent states, general truths, schedules, and live storytelling.',
    examQuestionIds: [46, 49, 55],
    examSentences: [
      {
        text: 'Social media, magazines, and shop windows bombard people daily with things to buy.',
        source: 'Q46',
        function: 'Facts'
      },
      {
        text: 'In Britain, the average person spends more than GBP1,000 on new clothes a year.',
        source: 'Q48',
        function: 'Facts'
      },
      {
        text: 'Some YouTube stars now advise their viewers not to buy anything for long periods.',
        source: 'Q57',
        function: 'Habits / routines'
      },
      {
        text: 'People organize various types of protests.',
        source: 'Q55',
        function: 'Habits / routines'
      },
      {
        text: 'He wants his students to follow the process writing approach.',
        source: 'Q39',
        function: 'Permanent states'
      }
    ],
    formulation: {
      rule: 'Affirmative: subject + base verb. Add -s/-es with he, she, or it. Question: do/does + subject + base verb?',
      examples: [
        {
          statement: 'The average person spends money on clothes.',
          question: 'Does the average person spend money on clothes?'
        },
        {
          statement: 'People organize various types of protests.',
          question: 'Do people organize various types of protests?'
        }
      ]
    },
    clozeOptions: ['bombard', 'make'],
    cloze: [
      {
        prompt: 'Social media, magazines, and shop windows _________ people daily with things to buy.',
        answer: 'bombard',
        explanation: 'The compound subject is plural, so use the base form bombard.'
      },
      {
        prompt: 'Bees _________ honey.',
        answer: 'make',
        explanation: 'The plural subject bees takes the base form make.'
      }
    ],
    composition: {
      prompt: 'Write 4 or 5 lines introducing yourself as a teacher or learner. Use the Present Simple for routines, facts, and preferences.',
      support: [
        'I teach / I study...',
        'I usually...',
        'My students need...',
        'I want to improve...'
      ]
    }
  },
  {
    id: 'present-continuous',
    order: 2,
    title: 'Present Continuous',
    level: 'Base plus',
    focus: 'Actions in progress, temporary situations and classroom monitoring.',
    examQuestionIds: [38, 45, 46],
    examSentences: [
      {
        text: "Fernanda's students are having a conversation.",
        source: 'Q38',
        function: 'Action in progress: describes what is happening now.'
      },
      {
        text: 'The students are working in pairs.',
        source: 'Q45',
        function: 'Classroom action: shows an activity happening at the moment.'
      },
      {
        text: 'British consumers are buying more clothes and shoes than ever before.',
        source: 'Q46',
        function: 'Current trend: shows a changing situation.'
      },
      {
        text: "The teacher is correcting the students' texts.",
        source: 'Q25',
        function: 'Ongoing action: highlights a process in progress.'
      },
      {
        text: 'The students are using the following expressions.',
        source: 'Q38',
        function: 'Temporary classroom use: focuses on current language practice.'
      }
    ],
    formulation: {
      rule: 'Affirmative: subject + am/is/are + verb-ing. Question: am/is/are + subject + verb-ing?',
      examples: [
        {
          statement: 'The students are working in pairs.',
          question: 'Are the students working in pairs?'
        },
        {
          statement: 'The teacher is correcting the texts.',
          question: 'Is the teacher correcting the texts?'
        }
      ]
    },
    clozeOptions: ['have', 'read', 'buy'],
    cloze: [
      {
        prompt: "Fernanda's students _________ a conversation.",
        answer: 'are having',
        explanation: 'Use are having with the plural subject students.'
      },
      {
        prompt: "The teacher _________ the students' texts.",
        answer: 'is reading',
        explanation: 'Use is reading with the singular subject teacher.'
      },
      {
        prompt: 'British consumers _________ more clothes.',
        answer: 'are buying',
        explanation: 'Use are buying for a changing current trend.'
      }
    ],
    composition: {
      prompt: 'Describe what is happening in your classroom or study space right now.',
      support: ['I am reviewing...', 'My classmates are...', 'The teacher is...', 'We are preparing...']
    }
  },
  {
    id: 'past-simple',
    order: 3,
    title: 'Past Simple',
    level: 'Narrative',
    focus: 'Finished actions, events and past time markers.',
    examQuestionIds: [6, 30, 54],
    examSentences: [
      {
        text: 'The idea originated in Canada in the early 1990s.',
        source: 'Q54',
        function: 'Specific Time in the Past.'
      },
      {
        text: 'The idea moved to the US.',
        source: 'Q54',
        function: 'Storytelling / Sequence.'
      },
      {
        text: 'Two friends in Canada spent a year working towards buying only food.',
        source: 'Q58',
        function: 'Past Habits / Routines.'
      },
      {
        text: 'I opened a new e-mail account with a different password.',
        source: 'Q13',
        function: 'Storytelling / Sequence.'
      },
      {
        text: 'The changes they made meant two fewer cars on the roads.',
        source: 'Q59',
        function: 'Historical Facts.'
      }
    ],
    formulation: {
      rule: 'Regular verbs add -ed; irregular verbs change form. Questions use did + subject + base verb.',
      examples: [
        {
          statement: 'The idea originated in Canada.',
          question: 'Did the idea originate in Canada?'
        },
        {
          statement: 'The idea originated in Canada.',
          question: 'Where did the idea originate?'
        },
        {
          statement: 'They spent a year buying only food.',
          question: 'Did they spend a year buying only food?'
        },
        {
          statement: 'They spent a year buying only food.',
          question: 'How long did they spend buying only food?'
        }
      ]
    },
    clozeOptions: ['originate', 'spend', 'write'],
    cloze: [
      {
        prompt: 'The idea _________ in Canada in the early 1990s.',
        answer: 'originated',
        explanation: 'A finished event in the past uses past simple.'
      },
      {
        prompt: 'Two friends _________ a year working towards buying only food.',
        answer: 'spent',
        explanation: 'Spend is irregular: spend, spent, spent.'
      },
      {
        prompt: 'I _________ a new e-mail.',
        answer: 'wrote',
        explanation: 'Write is irregular: write, wrote, written.'
      }
    ],
    composition: {
      prompt: 'Write a short paragraph about one study decision you made before an exam.',
      support: ['Last week...', 'I decided...', 'I reviewed...', 'It helped me because...']
    }
  },
  {
    id: 'past-continuous',
    order: 4,
    title: 'Past Continuous',
    level: 'Narrative',
    focus: 'Background actions and scenes in a past story.',
    examQuestionIds: [6, 26, 27],
    examSentences: [
      {
        text: 'People were sailing boats and water skiing.',
        source: 'Q6',
        function: 'Background.'
      },
      {
        text: 'We were watching some jet skiers.',
        source: 'Q6',
        function: 'In-progress action.'
      },
      {
        text: 'They were swimming next to us.',
        source: 'Q6',
        function: 'In-progress action.'
      }
    ],
    formulation: {
      rule: 'Use was/were + verb-ing. Questions: was/were + subject + verb-ing?',
      examples: [
        {
          statement: 'People were sailing boats.',
          question: 'Were people sailing boats?'
        },
        {
          statement: 'We were watching jet skiers.',
          question: 'Were we watching jet skiers?'
        }
      ]
    },
    clozeOptions: ['sail', 'watch', 'swim'],
    cloze: [
      {
        prompt: 'People _________ boats.',
        answer: 'were sailing',
        explanation: 'Use were + sailing with the plural subject people.'
      },
      {
        prompt: 'We _________ some jet skiers.',
        answer: 'were watching',
        explanation: 'Use were + watching to describe an action in progress in the past.'
      },
      {
        prompt: 'They _________ next to us.',
        answer: 'were swimming',
        explanation: 'Use were + swimming to describe an ongoing past action.'
      }
    ],
    composition: {
      prompt: 'Describe a memory from a class, trip or exam day using past continuous for the background.',
      support: ['People were...', 'I was...', 'We were...', 'Then...']
    }
  },
  {
    id: 'present-perfect',
    order: 5,
    title: 'Present Perfect',
    level: 'Bridge',
    focus: 'Past experiences connected to the present and recent results.',
    examQuestionIds: [9, 22, 56],
    examSentences: [
      {
        text: 'They have seen a movie recently.',
        source: 'Q22',
        function: 'Recent experience: the exact past time is not the focus.'
      },
      {
        text: 'The trend has reached influencers on social media.',
        source: 'Q56',
        function: 'Past-to-present result: the trend matters now.'
      },
      {
        text: 'Once the students have practiced different reading skills...',
        source: 'Q28',
        function: 'Completed action before the next stage.'
      },
      {
        text: 'After the students have read the text...',
        source: 'Q27',
        function: 'Completed reading before follow-up work.'
      },
      {
        text: 'Students have written a text in which they give advice to a friend.',
        source: 'Q25',
        function: 'Completed product with present relevance.'
      }
    ],
    formulation: {
      rule: 'Use have/has + past participle. Questions: have/has + subject + past participle?',
      examples: [
        {
          statement: 'They have seen a movie recently.',
          question: 'Have they seen a movie recently?'
        },
        {
          statement: 'The trend has reached influencers.',
          question: 'Has the trend reached influencers?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'The trend _________ reached influencers.',
        answer: 'has',
        explanation: 'The singular subject trend uses has.'
      },
      {
        prompt: 'They have _________ a movie recently.',
        answer: 'seen',
        explanation: 'See becomes seen as a past participle.'
      },
      {
        prompt: 'The students have _________ the text.',
        answer: 'read',
        explanation: 'Read is the past participle form in present perfect.'
      }
    ],
    composition: {
      prompt: 'Write about three things you have already done to prepare for the exam.',
      support: ['I have reviewed...', 'I have practiced...', 'I have learned...', 'I have not studied... yet.']
    }
  },
  {
    id: 'perfect-sequencing',
    order: 6,
    title: 'Perfect Tenses and Sequencing',
    level: 'Bridge',
    focus: 'Present perfect continuous, past perfect and sequence markers.',
    examQuestionIds: [31, 40, 58],
    examSentences: [
      {
        text: "Marlon's students have been talking about movies.",
        source: 'Q40',
        function: 'Present perfect continuous: activity started before and continues/recently happened.'
      },
      {
        text: 'After the students have talked for some minutes...',
        source: 'Q40',
        function: 'Completed step before the next classroom action.'
      },
      {
        text: 'After having done some reading comprehension activities...',
        source: 'Q31',
        function: 'Perfect gerund: shows one activity happened before another.'
      },
      {
        text: 'In one year, they had saved $55,000.',
        source: 'Q58',
        function: 'Past perfect result before the end of the narrated period.'
      },
      {
        text: 'Once the students are done writing, the teacher pairs them up.',
        source: 'Q39',
        function: 'Sequencing: one completed stage enables the next.'
      }
    ],
    formulation: {
      rule: 'Present perfect continuous: have/has been + verb-ing. Past perfect: had + past participle.',
      examples: [
        {
          statement: 'The students have been talking about movies.',
          question: 'Have the students been talking about movies?'
        },
        {
          statement: 'They had saved money in one year.',
          question: 'Had they saved money in one year?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'Students have _________ talking about movies.',
        answer: 'been',
        explanation: 'Present perfect continuous needs have/has been + verb-ing.'
      },
      {
        prompt: 'They had _________ $55,000.',
        answer: 'saved',
        explanation: 'Past perfect uses had + past participle.'
      },
      {
        prompt: 'After _________ done some reading activities, they paraphrase the text.',
        answer: 'having',
        explanation: 'After having done marks a previous completed action.'
      }
    ],
    composition: {
      prompt: 'Explain what you have been studying lately and what you had already reviewed before today.',
      support: ['I have been studying...', 'I had already reviewed...', 'After having practiced...', 'Now I can...']
    }
  },
  {
    id: 'future-forms',
    order: 7,
    title: 'Future Forms',
    level: 'Development',
    focus: 'Will, be going to, be about to and scheduled future events.',
    examQuestionIds: [5, 35, 59],
    examSentences: [
      {
        text: 'There will be athletes from different countries.',
        source: 'Q35',
        function: 'Future prediction or announcement with will.'
      },
      {
        text: 'The Pan American and Parapan American Games are about to start.',
        source: 'Q35',
        function: 'Immediate future: something will happen very soon.'
      },
      {
        text: 'What are some challenges the next generation will face?',
        source: 'Q5',
        function: 'Future prediction in a question.'
      },
      {
        text: "Alejandro's students are going to write a paragraph.",
        source: 'Q39',
        function: 'Planned future action.'
      },
      {
        text: "Zaira's students are about to read the text.",
        source: 'Q44',
        function: 'Action that is going to happen immediately.'
      }
    ],
    formulation: {
      rule: 'Will + base verb for predictions; be going to + base verb for plans; be about to + base verb for immediate future.',
      examples: [
        {
          statement: 'There will be athletes from different countries.',
          question: 'Will there be athletes from different countries?'
        },
        {
          statement: 'The students are going to write a paragraph.',
          question: 'Are the students going to write a paragraph?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'There _________ be athletes from different countries.',
        answer: 'will',
        explanation: 'Will marks a future announcement.'
      },
      {
        prompt: 'The students are _________ to write a paragraph.',
        answer: 'going',
        explanation: 'Plans use be going to + base verb.'
      },
      {
        prompt: 'The games are about _________ start.',
        answer: 'to',
        explanation: 'The structure is be about to + base verb.'
      }
    ],
    composition: {
      prompt: 'Write a short study plan for the next week using will, going to and about to.',
      support: ['I am going to...', 'I will...', 'I am about to...', 'My next goal will be...']
    }
  },
  {
    id: 'modals',
    order: 8,
    title: 'Modals',
    level: 'Development',
    focus: 'Advice, ability, obligation, possibility and criticism.',
    examQuestionIds: [20, 25, 60],
    examSentences: [
      {
        text: 'Junk food should be banned in schools.',
        source: 'Q20',
        function: 'Recommendation or opinion with should.'
      },
      {
        text: 'You could have used more of the expressions to give advice.',
        source: 'Q25',
        function: 'Past suggestion or criticism with could have.'
      },
      {
        text: 'Students can learn without feeling limited by those resources.',
        source: 'Q2',
        function: 'Ability or possibility with can.'
      },
      {
        text: 'We have to make a timeline about our favorite singer.',
        source: 'Q45',
        function: 'Obligation or requirement with have to.'
      },
      {
        text: 'People are no longer willing to accept the environmental and human cost.',
        source: 'Q60',
        function: 'Willing to expresses readiness or disposition.'
      }
    ],
    formulation: {
      rule: 'Modals are followed by base verb. Questions: modal + subject + base verb?',
      examples: [
        {
          statement: 'Students can learn with different resources.',
          question: 'Can students learn with different resources?'
        },
        {
          statement: 'We have to make a timeline.',
          question: 'Do we have to make a timeline?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'Junk food _________ be banned in schools.',
        answer: 'should',
        explanation: 'Should expresses recommendation or opinion.'
      },
      {
        prompt: 'Students _________ learn without feeling limited.',
        answer: 'can',
        explanation: 'Can expresses possibility or ability.'
      },
      {
        prompt: 'We have _________ make a timeline.',
        answer: 'to',
        explanation: 'Have to expresses obligation.'
      }
    ],
    composition: {
      prompt: 'Give advice to a classmate who is preparing for the exam. Use should, can and have to.',
      support: ['You should...', 'You can...', 'You have to...', 'You could...']
    }
  },
  {
    id: 'imperatives',
    order: 9,
    title: 'Imperatives',
    level: 'Development',
    focus: 'Instructions, classroom commands and promotional language.',
    examQuestionIds: [23, 35, 37],
    examSentences: [
      {
        text: "Don't miss this opportunity.",
        source: 'Q35',
        function: 'Negative imperative used to persuade.'
      },
      {
        text: 'Look for information about venues, ticket prices, dates and schedules.',
        source: 'Q35',
        function: 'Instruction with base verb.'
      },
      {
        text: 'Climb up the tree and hold on tight.',
        source: 'Q23',
        function: 'Commands in a poem or action sequence.'
      },
      {
        text: 'Pick that round apple and take a big bite.',
        source: 'Q23',
        function: 'Imperatives giving direct actions.'
      },
      {
        text: "Don't buy it.",
        source: 'Q31',
        function: 'Negative imperative used as advice.'
      }
    ],
    formulation: {
      rule: "Use the base verb without subject. Negative form: do not/don't + base verb.",
      examples: [
        {
          statement: 'You look for information.',
          question: 'Look for information.'
        },
        {
          statement: 'You do not miss this opportunity.',
          question: "Don't miss this opportunity."
        }
      ]
    },
    cloze: [
      {
        prompt: '_________ for information about venues.',
        answer: 'look',
        explanation: 'Imperatives start with the base verb.'
      },
      {
        prompt: "Don't _________ this opportunity.",
        answer: 'miss',
        explanation: "Negative imperatives use do not/don't + base verb."
      },
      {
        prompt: '_________ that round apple and take a big bite.',
        answer: 'pick',
        explanation: 'Pick is the base verb used as a command.'
      }
    ],
    composition: {
      prompt: 'Write five instructions for a student who wants to complete a practice module.',
      support: ['Read...', 'Underline...', 'Check...', "Don't forget...", 'Review...']
    }
  },
  {
    id: 'gerunds-infinitives',
    order: 10,
    title: 'Verbs + gerunds/infinitives',
    level: 'Development',
    focus: 'Verb patterns after prepositions, purpose and repeated exam collocations.',
    examQuestionIds: [48, 52, 57],
    examSentences: [
      {
        text: 'Online shopping means it is easy for customers to buy without thinking.',
        source: 'Q46',
        function: 'Infinitive after adjective; gerund after without.'
      },
      {
        text: 'Two friends spent a year working towards buying only food.',
        source: 'Q58',
        function: 'Gerunds after spend time and preposition towards.'
      },
      {
        text: 'You can participate by refusing to buy things you do not need.',
        source: 'Q60',
        function: 'Gerund after by; infinitive after refuse.'
      },
      {
        text: 'He wants his students to follow the process writing approach.',
        source: 'Q39',
        function: 'Want + object + infinitive.'
      },
      {
        text: 'The teacher tells them to ask each other questions.',
        source: 'Q40',
        function: 'Tell + object + infinitive.'
      }
    ],
    formulation: {
      rule: 'Use infinitive after want/tell/ask/encourage. Use gerund after prepositions such as by, without and towards.',
      examples: [
        {
          statement: 'The teacher tells the students. They ask questions.',
          question: 'Does the teacher tell the students to ask questions?'
        },
        {
          statement: 'People refuse to buy unnecessary things.',
          question: 'Do people refuse to buy unnecessary things?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'It is easy for customers _________ buy without thinking.',
        answer: 'to',
        explanation: 'After easy for someone, use to + base verb.'
      },
      {
        prompt: 'They spent a year _________ towards buying only food.',
        answer: 'working',
        explanation: 'Spend time is followed by verb-ing.'
      },
      {
        prompt: 'You can participate by _________ to buy unnecessary things.',
        answer: 'refusing',
        explanation: 'After by, use a gerund.'
      }
    ],
    composition: {
      prompt: 'Write about what you want to improve and what you are doing to prepare for the exam.',
      support: ['I want to...', 'I need to...', 'I prepare by...', 'I avoid...']
    }
  },
  {
    id: 'determiners',
    order: 11,
    title: 'The hows and quantifiers',
    level: 'Development',
    focus: 'How questions, measurements, and quantifiers for count and non-count nouns.',
    examQuestionIds: [47, 48, 51],
    examSentences: [
      {
        text: 'A different trend is springing up in opposition to overconsumption.',
        source: 'Q53',
        function: 'A introduces one new countable noun.'
      },
      {
        text: 'The average person spends more than GBP1,000 on new clothes a year.',
        source: 'Q48',
        function: 'The points to a general category as a known idea.'
      },
      {
        text: 'All those unwanted clothes cannot be sold by charity shops.',
        source: 'Q51',
        function: 'All those emphasizes a whole group already mentioned.'
      },
      {
        text: 'Some volunteers share their ideas with the whole class.',
        source: 'Q39',
        function: 'Some refers to an indefinite part of a group.'
      },
      {
        text: 'People are buying more clothes and shoes than ever before.',
        source: 'Q46',
        function: 'More marks an increase in quantity.'
      }
    ],
    formulation: {
      rule: 'Use a/an for one new singular countable noun, the for known/specific nouns, and quantifiers to show amount.',
      examples: [
        {
          statement: 'A trend is springing up.',
          question: 'Is a trend springing up?'
        },
        {
          statement: 'The average person spends money on clothes.',
          question: 'Does the average person spend money on clothes?'
        }
      ]
    },
    cloze: [
      {
        prompt: '_________ different trend is springing up.',
        answer: 'a',
        explanation: 'Use a before a new singular countable noun.'
      },
      {
        prompt: '_________ average person spends money on clothes.',
        answer: 'the',
        explanation: 'The average person refers to a general known category.'
      },
      {
        prompt: 'People are buying _________ clothes than ever before.',
        answer: 'more',
        explanation: 'More compares quantity with the past.'
      }
    ],
    composition: {
      prompt: 'Describe your study materials using articles and quantifiers.',
      support: ['I have a...', 'The most useful...', 'Some notes...', 'More practice...']
    }
  },
  {
    id: 'intensifiers',
    order: 13,
    title: 'Intensifiers',
    level: 'Development',
    focus: 'So, such, enough, as much as possible and emphasis.',
    examQuestionIds: [7, 23, 47],
    examSentences: [
      {
        text: 'Major brands offer such cheap clothes that they can be treated like disposable items.',
        source: 'Q47',
        function: 'Such + adjective + noun + that shows result.'
      },
      {
        text: 'There is an apple so big and round.',
        source: 'Q23',
        function: 'So + adjective intensifies a quality.'
      },
      {
        text: "They're such awesome animals!",
        source: 'Q6',
        function: 'Such + adjective + plural noun adds emphasis.'
      },
      {
        text: 'Write as much information as possible in their notebooks.',
        source: 'Q37',
        function: 'As much as possible maximizes quantity.'
      },
      {
        text: 'They know their speeches well enough.',
        source: 'Q19',
        function: 'Enough after an adverb shows sufficient degree.'
      }
    ],
    formulation: {
      rule: 'Use so + adjective/adverb. Use such + adjective + noun. Use adjective/adverb + enough.',
      examples: [
        {
          statement: 'The clothes are very cheap.',
          question: 'Are the clothes so cheap that they seem disposable?'
        },
        {
          statement: 'They are awesome animals.',
          question: 'Are they such awesome animals?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'They offer _________ cheap clothes that people throw them away.',
        answer: 'such',
        explanation: 'Use such before adjective + noun.'
      },
      {
        prompt: 'The apple is _________ big and round.',
        answer: 'so',
        explanation: 'Use so before an adjective.'
      },
      {
        prompt: 'They know the speeches well _________.',
        answer: 'enough',
        explanation: 'Enough follows the adjective or adverb it modifies.'
      }
    ],
    composition: {
      prompt: 'Write a short product review using so, such and enough.',
      support: ['It is so...', 'It has such...', 'It is not ... enough.', 'Overall...']
    }
  },
  {
    id: 'passive-voice',
    order: 14,
    title: 'Passive Voice',
    level: 'Complex',
    focus: 'Be + past participle for processes, results and formal statements.',
    examQuestionIds: [20, 33, 52],
    examSentences: [
      {
        text: 'Junk food should be banned in schools.',
        source: 'Q20',
        function: 'Modal passive: focus on the action, not the agent.'
      },
      {
        text: 'Huge quantities end up being thrown away.',
        source: 'Q52',
        function: 'Gerund passive after end up.'
      },
      {
        text: 'A lot of clothes that charities cannot sell are sent abroad.',
        source: 'Q52',
        function: 'Present passive for a process.'
      },
      {
        text: 'The purpose has been achieved.',
        source: 'Q39',
        function: 'Present perfect passive for a completed result.'
      },
      {
        text: 'Expressions are provided by the teacher.',
        source: 'Q33',
        function: 'Passive with agent introduced by by.'
      }
    ],
    formulation: {
      rule: 'Use be + past participle. With modals: modal + be + past participle. With perfect: have/has been + past participle.',
      examples: [
        {
          statement: 'Schools should ban junk food.',
          question: 'Should junk food be banned in schools?'
        },
        {
          statement: 'The students have achieved the purpose.',
          question: 'Has the purpose been achieved?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'Junk food should _________ banned in schools.',
        answer: 'be',
        explanation: 'Modal passive uses modal + be + past participle.'
      },
      {
        prompt: 'Huge quantities end up being _________ away.',
        answer: 'thrown',
        explanation: 'The passive participle of throw is thrown.'
      },
      {
        prompt: 'The purpose has _________ achieved.',
        answer: 'been',
        explanation: 'Present perfect passive uses has/have been + participle.'
      }
    ],
    composition: {
      prompt: 'Write three formal recommendations for a school using passive voice.',
      support: ['Students should be...', 'Resources must be...', 'Activities can be...', 'Feedback should be...']
    }
  },
  {
    id: 'conditionals',
    order: 15,
    title: 'Conditionals and Cause',
    level: 'Complex',
    focus: 'If, even if, since and hypothetical results.',
    examQuestionIds: [50, 51, 59],
    examSentences: [
      {
        text: 'If everyone followed a similar plan, the results would be impressive.',
        source: 'Q59',
        function: 'Second conditional: hypothetical situation and result.'
      },
      {
        text: "Even if you can't manage a full year without going shopping, you can participate.",
        source: 'Q60',
        function: 'Concession: the result remains possible despite a limitation.'
      },
      {
        text: 'People might not realize the problem since they donate their unwanted clothes to charities.',
        source: 'Q51',
        function: 'Cause: since introduces a reason.'
      },
      {
        text: 'If I got it right, we have to make a timeline.',
        source: 'Q45',
        function: 'Checking understanding with if.'
      },
      {
        text: 'The audience asks further questions if they need clarification.',
        source: 'Q11',
        function: 'Real condition: possible classroom situation.'
      }
    ],
    formulation: {
      rule: 'Real condition: if + present, present/will. Hypothetical: if + past, would + base verb.',
      examples: [
        {
          statement: 'Everyone follows the plan. The results are impressive.',
          question: 'Would the results be impressive if everyone followed the plan?'
        },
        {
          statement: 'They need clarification. They ask questions.',
          question: 'Do they ask questions if they need clarification?'
        }
      ]
    },
    cloze: [
      {
        prompt: 'If everyone followed the plan, the results _________ be impressive.',
        answer: 'would',
        explanation: 'Second conditional uses would + base verb in the result clause.'
      },
      {
        prompt: 'People may not realize the problem _________ they donate clothes.',
        answer: 'since',
        explanation: 'Since introduces the reason.'
      },
      {
        prompt: '_________ if you cannot manage a full year, you can participate.',
        answer: 'even',
        explanation: 'Even if introduces a concession.'
      }
    ],
    composition: {
      prompt: 'Write a short reflection about exam preparation using if, since and even if.',
      support: ['If I practice...', 'Since I need...', 'Even if I make mistakes...', 'I would...']
    }
  },
  {
    id: 'cohesion-complex-sentences',
    order: 16,
    title: 'Cohesion and Complex Sentences',
    level: 'Complex',
    focus: 'However, not only... but, relative clauses and reference words.',
    examQuestionIds: [27, 50, 53],
    examSentences: [
      {
        text: "Not only are people spending money they do not have, but they are using it to buy things they do not need.",
        source: 'Q50',
        function: 'Correlative structure that adds and emphasizes a second idea.'
      },
      {
        text: 'However, a different trend is springing up in opposition to overconsumption.',
        source: 'Q53',
        function: 'Contrast marker: introduces an opposing idea.'
      },
      {
        text: 'This figure is around four per cent of their income.',
        source: 'Q48',
        function: 'Reference word: this points back to a previous amount.'
      },
      {
        text: 'Most of which goes into landfill sites.',
        source: 'Q50',
        function: 'Relative clause: adds information about clothing waste.'
      },
      {
        text: 'It moved to the US, where it became a reaction to overspending.',
        source: 'Q54',
        function: 'Where links a place to extra information.'
      }
    ],
    formulation: {
      rule: 'Use connectors to show relation between ideas. Use relative clauses to add information without starting a new sentence.',
      examples: [
        {
          statement: 'A different trend is springing up. It opposes overconsumption.',
          question: 'Is a different trend springing up in opposition to overconsumption?'
        },
        {
          statement: 'It moved to the US. It became a reaction there.',
          question: 'Where did it become a reaction to overspending?'
        }
      ]
    },
    cloze: [
      {
        prompt: '_________, a different trend is springing up.',
        answer: 'however',
        explanation: 'However introduces contrast with the previous idea.'
      },
      {
        prompt: 'Not only are people spending money, _________ they are buying things they do not need.',
        answer: 'but',
        explanation: 'The fixed structure is not only... but also/but.'
      },
      {
        prompt: 'It moved to the US, _________ it became a reaction to overspending.',
        answer: 'where',
        explanation: 'Where introduces extra information about a place.'
      }
    ],
    composition: {
      prompt: 'Write a short opinion paragraph about overconsumption using contrast and one relative clause.',
      support: ['However,...', 'Not only..., but...', 'This...', 'where/which...']
    }
  }
];

const questionFormsModule = {
  id: 'question-forms',
  order: 12,
  title: 'Question Forms',
  level: 'Base',
  focus: 'Yes/no questions, wh-questions and auxiliary order.',
  examQuestionIds: [38, 39, 45],
  examSentences: [
    {
      text: 'How often do the interviewees work out?',
      source: 'Q39',
      function: 'Wh-question with do: asks about frequency.'
    },
    {
      text: 'What are the advantages and disadvantages of working out?',
      source: 'Q39',
      function: 'Wh-question with be: asks for information about a topic.'
    },
    {
      text: 'Did you miss the bus or something?',
      source: 'Q38',
      function: 'Past yes/no question with did + base verb.'
    },
    {
      text: 'Does it mean we have to include all the information?',
      source: 'Q45',
      function: 'Clarifying question with does + subject + base verb.'
    },
    {
      text: 'What are some challenges the next generation will face?',
      source: 'Q5',
      function: 'Wh-question that asks for ideas or predictions.'
    }
  ],
  formulation: {
    rule: 'Use auxiliary + subject + main verb. Present simple uses do/does; past simple uses did; be goes before the subject.',
    examples: [
      {
        statement: 'The interviewees work out often.',
        question: 'How often do the interviewees work out?'
      },
      {
        statement: 'It means we have to include relevant information.',
        question: 'Does it mean we have to include relevant information?'
      }
    ]
  },
  cloze: [
    {
      prompt: 'How often _________ the interviewees work out?',
      answer: 'do',
      explanation: 'Plural subjects in the present simple use do.'
    },
    {
      prompt: '_________ you miss the bus yesterday?',
      answer: 'did',
      explanation: 'Past simple questions use did + base verb.'
    },
    {
      prompt: '_________ it mean we have to include all the information?',
      answer: 'does',
      explanation: 'The singular subject it uses does.'
    }
  ],
  composition: {
    prompt: 'Write five interview questions for a classmate about routines, study habits and recent experiences.',
    support: ['How often do you...?', 'Do you usually...?', 'Did you ever...?', 'What do you...?']
  }
};

const teachingSkillsModule = {
  id: 'teaching-skills',
  order: 13,
  title: 'Teaching Skills',
  level: 'Teacher Development',
  focus: 'Instructions, monitoring, feedback and reflective classroom practice.',
  examQuestionIds: [40, 41, 44],
  examSentences: [
    {
      text: 'The teacher gives clear instructions before the activity begins.',
      source: 'Teaching practice',
      function: 'Clear staging helps learners understand the task.'
    },
    {
      text: 'Students work in pairs while the teacher monitors their progress.',
      source: 'Teaching practice',
      function: 'Monitoring provides evidence without interrupting fluency.'
    },
    {
      text: 'The teacher asks concept-checking questions.',
      source: 'Teaching practice',
      function: 'Checking questions reveal whether meaning is understood.'
    },
    {
      text: 'Feedback focuses on both successful language and areas to improve.',
      source: 'Teaching practice',
      function: 'Balanced feedback supports confidence and accuracy.'
    },
    {
      text: 'After the lesson, the teacher reflects on the learning evidence.',
      source: 'Teaching practice',
      function: 'Reflection guides the next instructional decision.'
    }
  ],
  formulation: {
    rule: 'Plan each teaching move around a clear objective, observable learner action and useful evidence of learning.',
    examples: [
      {
        statement: 'Students compare two answers in pairs.',
        question: 'What evidence will show that students understand the difference?'
      },
      {
        statement: 'The teacher monitors a speaking task.',
        question: 'When should the teacher intervene and when should the teacher wait?'
      }
    ]
  },
  cloze: [
    {
      prompt: 'Give concise _________ before students begin the task.',
      answer: 'instructions',
      explanation: 'Instructions should clarify the action, timing and expected outcome.'
    },
    {
      prompt: 'Use questions to _________ understanding.',
      answer: 'check',
      explanation: 'Checking understanding is more reliable than asking only “Do you understand?”'
    },
    {
      prompt: 'Record evidence while you _________ pair work.',
      answer: 'monitor',
      explanation: 'Monitoring helps the teacher plan focused feedback.'
    }
  ],
  composition: {
    prompt: 'Write a short lesson reflection describing what learners achieved and what you would adjust next time.',
    support: ['Learners were able to...', 'The evidence was...', 'Next time I will...', 'I would check...']
  }
};

const baseGrammarModules = [
  ...grammarModuleLibrary.filter((module) => module.order <= 11),
  questionFormsModule,
  teachingSkillsModule
];

export const grammarModules = baseGrammarModules.map((module) => {
  const supplement = moduleExamSupplements[module.id];

  if (!supplement) {
    return module;
  }

  return {
    ...module,
    examQuestionIds: [...new Set([...module.examQuestionIds, ...supplement.questionIds])],
    examSentences: [...module.examSentences, ...supplement.examSentences]
  };
});

export const getGrammarModule = (moduleId) => {
  return grammarModules.find((module) => module.id === moduleId) || grammarModules[0];
};
