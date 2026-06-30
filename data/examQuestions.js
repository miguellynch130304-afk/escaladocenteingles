// Generated from the provided exam PDFs. Keep this file ASCII-only for portability.
import { supplementalExamQuestions } from 'data/supplementalExamQuestions';
import { historicalExamQuestions } from 'data/historicalExamQuestions';

export const examMetadata = {
  "title": "Comprehensive Advanced EBA English Mock Exam",
  "examCode": "Integrated official bank",
  "totalQuestions": 180,
  "durationMinutes": 540,
  "sourcePdf": "Official exam bank",
  "answerKeyPdf": "Official answer key"
};

export const passingThresholds = [
  {
    "scale": "Second scale",
    "minimum": 72
  },
  {
    "scale": "Third scale",
    "minimum": 76
  },
  {
    "scale": "Fourth scale",
    "minimum": 80
  },
  {
    "scale": "Fifth scale",
    "minimum": 84
  },
  {
    "scale": "Sixth scale",
    "minimum": 88
  },
  {
    "scale": "Seventh scale",
    "minimum": 92
  },
  {
    "scale": "Eighth scale",
    "minimum": 92
  }
];

export const prepModules = [
  {
    "id": "inclusion",
    "title": "Enfoque inclusivo y UDL",
    "range": "1-3",
    "description": "Valores del enfoque inclusivo, accesibilidad y diseno universal para el aprendizaje.",
    "questionIds": [
      1,
      2,
      3
    ]
  },
  {
    "id": "didactics",
    "title": "Didactica de aula",
    "range": "4-10",
    "description": "Coherencia, funciones del lenguaje, lectura, escritura y correccion en clase.",
    "questionIds": [
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  {
    "id": "speaking",
    "title": "Oralidad y secuencias",
    "range": "11-20",
    "description": "Discusion, debate, fluidez, funciones comunicativas y cierre de sesiones.",
    "questionIds": [
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ]
  },
  {
    "id": "reading-writing",
    "title": "Lectura y escritura",
    "range": "21-32",
    "description": "Lectura intensiva/extensiva, resenas, poemas, pronunciacion y tareas posteriores.",
    "questionIds": [
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32
    ]
  },
  {
    "id": "feedback-listening",
    "title": "Listening y feedback",
    "range": "33-45",
    "description": "Listening, presentaciones, task-based learning, feedback reflexivo y proceso de escritura.",
    "questionIds": [
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45
    ]
  },
  {
    "id": "cloze",
    "title": "Cloze final",
    "range": "46-60",
    "description": "Uso de lengua en contexto: vocabulario, gramatica, cohesion y colocaciones.",
    "questionIds": [
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60
    ]
  }
];

const primaryExamQuestions = [
  {
    "id": 1,
    "module": "inclusion",
    "topic": "Inclusive approach and UDL",
    "stimulus": "",
    "prompt": "A teachers' meeting regarding pedagogical management documents is being held in a school. In this context, the teachers are sharing their ideas about school management that considers the values of the inclusive approach. Which of the following teachers' comments aligns with those values?",
    "options": {
      "A": "\"The school should help the students with disabilities achieve similar performances to those of their peers who do not have that condition.\"",
      "B": "\"The school should ensure that the students with disabilities have the same opportunities to learn as any other student.\"",
      "C": "\"The school should promote that the students with disabilities receive both specialized treatment and pedagogical attention.\""
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La opcion B expresa equidad de oportunidades: todos los estudiantes deben acceder al aprendizaje. A se centra en igualar desempenos y C separa por tratamiento especializado, por eso no recoge mejor el valor inclusivo."
  },
  {
    "id": 2,
    "module": "inclusion",
    "topic": "Inclusive approach and UDL",
    "stimulus": "",
    "prompt": "During a meeting about the implementation of universal design for learning (UDL), the lead teacher offers some suggestions about resources that can be used to support students in the classroom. Below is one of those suggestions: \"When designing a learning session, it is necessary that the resources we use respond to the characteristics of our students. This way, we can offer texts, graphics, or audiovisual materials so that the students can learn without feeling limited by those resources.\" Which of the following UDL principles is reflected in the suggestion above?",
    "options": {
      "A": "Provide multiple means of engagement.",
      "B": "Provide multiple means of representation.",
      "C": "Provide multiple means of action and expression."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "El recurso se adapta mediante textos, graficos o materiales audiovisuales. Eso corresponde a multiples medios de representacion, porque cambia la forma en que se presenta la informacion."
  },
  {
    "id": 3,
    "module": "inclusion",
    "topic": "Inclusive approach and UDL",
    "stimulus": "",
    "prompt": "Teachers at a school are attending a talk about supporting people with disabilities. Since the school has students with physical disabilities, the facilitating teacher suggests making some adaptations to the school facilities. Below is one of the adaptation proposals shared by the facilitating teacher: \"In order for students with physical disabilities to use the school facilities and move around freely, it is necessary to provide regular maintenance to the ramps. It is also essential to ensure that hallways and bathrooms have secure handrails. Additionally, it would be a good idea to set up some rest areas in the schoolyard.\" Three teachers share their ideas on the proposal. Which of the following teacher comments aligns with the inclusive approach?",
    "options": {
      "A": "\"I think the proposal will support the integration of students. I mean it will be easier for those with physical disabilities to receive help from their peers to move around the school facilities.\"",
      "B": "\"I believe that with this proposal, the safety of students with physical disabilities is being prioritized. By implementing it, we will help prevent accidents as they move around the school facilities.\"",
      "C": "\"I believe the proposal aims to create favorable conditions for students with physical disabilities. This will help those students, as well as their peers, decide when to move around the school facilities.\""
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La opcion C apunta a accesibilidad y autonomia: las adaptaciones permiten que todos decidan y se desplacen en mejores condiciones. A se centra en ayuda de pares y B solo en seguridad."
  },
  {
    "id": 4,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "",
    "prompt": "Alberto has noticed that some of his students write paragraphs that lack coherence, so he wants to help his students understand what coherence is. Which of the following activities is appropriate to achieve Alberto's purpose?",
    "options": {
      "A": "The teacher pairs up the students and hands out a paragraph to each pair. The paragraph has missing punctuation marks and misspelled words. The teacher asks the students to add the right punctuation and correct the misspelled words; then he invites some volunteers to read their answers aloud.",
      "B": "The teacher writes five pairs of simple sentences on the board. He pairs up the students and asks them to connect the sentences using conjunctions such as \"before,\" \"after,\" \"when,\" and \"while.\" Next, some students go to the board to connect each pair of sentences using the appropiate conjunction.",
      "C": "The teacher pairs up the students and provides them with an envelope containing strips of paper with written sentences taken from a paragraph. He asks the students to put the strips in the correct order so that the paragraph segments are logically connected. Then the teacher checks the correct order with the whole class."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La coherencia trata de la relacion logica entre ideas. Ordenar tiras de un parrafo obliga a reconocer continuidad, progresion y conexion entre oraciones."
  },
  {
    "id": 5,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "",
    "prompt": "Marlene's students are going to have a group discussion on the following question: \"What are some challenges the next generation will face?\" She asks her students to use some of the following expressions: - What's more, ... - Not to mention that ... - You also have to consider... Which of the following language functions corresponds to the expressions Marlene wants her students to practice?",
    "options": {
      "A": "Adding an argument.",
      "B": "Introducing a point of view.",
      "C": "Expressing degrees of certainty."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Expresiones como \"What is more\" y \"Not to mention that\" agregan razones o argumentos a una idea previa; no introducen punto de vista ni grados de certeza."
  },
  {
    "id": 6,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "Read the following situation and answer questions 6 and 7. Emilio would like to work on his students' writing skills by using a blog entry about amazing experiences. Here's the input he will use: Pedro Padilla - My Amazing Jet Ski Experience Posted 3:17 pm We went to Mirror Lake for our summer vacation. Our first day was so busy! People were sailing boats and water skiing, and there were a lot of jet skis and windsurfers. We were watching some jet skiers, and then suddenly my mom said, \"Let's try the jet skis!\" I was so excited! An instructor from the jet ski school explained how to ride the jet skis. Then we practiced near the beach. Toni and I learned how to go over waves, and after ten minutes, we were riding really fast! Then I rode with my mom, and my sister rode with my dad. It was such a memorable experience! Then we saw some dolphins. They're such awesome animals! They were swimming next to us. I'm looking forward to coming back again! 4 comments Adapted from Styring J. & Tims, N. (2017). Metro 2. Oxford University Press.",
    "prompt": "After Emilio's students read the text, he would like them to scan some information. Which of the following set of questions is appropriate for this purpose?",
    "options": {
      "A": "- Is this experience happening now or in the past? - Is Pedro's mother an adventurous person? Why? - Who is Toni?",
      "B": "- Where was the holiday? - Who is the blog's writer? - What activities did they do?",
      "C": "- Did they have a good day? - How did they feel doing the activities? - Did they feel tired at the end of the day? Why?"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Scanning consiste en ubicar datos especificos rapidamente. Preguntar lugar, autor y actividades pide informacion puntual del texto, no interpretaciones generales."
  },
  {
    "id": 7,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "Read the following situation and answer questions 6 and 7. Emilio would like to work on his students' writing skills by using a blog entry about amazing experiences. Here's the input he will use: Pedro Padilla - My Amazing Jet Ski Experience Posted 3:17 pm We went to Mirror Lake for our summer vacation. Our first day was so busy! People were sailing boats and water skiing, and there were a lot of jet skis and windsurfers. We were watching some jet skiers, and then suddenly my mom said, \"Let's try the jet skis!\" I was so excited! An instructor from the jet ski school explained how to ride the jet skis. Then we practiced near the beach. Toni and I learned how to go over waves, and after ten minutes, we were riding really fast! Then I rode with my mom, and my sister rode with my dad. It was such a memorable experience! Then we saw some dolphins. They're such awesome animals! They were swimming next to us. I'm looking forward to coming back again! 4 comments Adapted from Styring J. & Tims, N. (2017). Metro 2. Oxford University Press.",
    "prompt": "At the following stage of the lesson, Emilio wants his students to work on the intensifiers \"so\" and \"such\" included in the text, since the students will use them later in their own writings to express intensity. He has planned three strategies to achieve his purpose. Which of the strategies Emilio has planned follows the inductive approach?",
    "options": {
      "A": "The teacher writes, on the board, some of the sentences from the text that have the intensifiers \"so\" and \"such.\" Then he pairs up the students and asks them to share ideas about when and why those intensifiers are used. Next, the teacher elicits the students' ideas orally. Finally, each pair creates their own examples.",
      "B": "The teacher displays a piece of flipchart that contains some sentences with the intensifiers \"so\" and \"such\" and explains how to use them. Then he asks the students to write some sentences using those intensifiers. After that, the students compare their sentences with a partner. Finally, some volunteers read their sentences aloud.",
      "C": "The teacher gives the students a worksheet about the intensifiers \"such\" and \"so.\" In the worksheet, there are two examples of each intensifier and sentences with blanks in them. The students analyze the examples provided and then fill in the blanks with the correct intensifier. Finally, the students check their answers in pairs."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "El enfoque inductivo parte de ejemplos reales y lleva a los estudiantes a inferir la regla. En A analizan oraciones del texto antes de formular sus propios ejemplos."
  },
  {
    "id": 8,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "",
    "prompt": "Berenice is preparing her lesson for a reading session. She has noticed that the text for the next session is a recipe for a dish that is not popular in the students' community, so she has decided to make the text more meaningful for her students. Which of the following activities is more appropriate to carry out in order to achieve the teacher's purpose?",
    "options": {
      "A": "The teacher adapts the text by deleting some words the students may find difficult to understand before she gives a copy of it to each student. Next, the students read the text individually. Finally, the teacher calls on some volunteers to explain to the class what they have understood.",
      "B": "The teacher brings pictures that show the ingredients for the recipe mentioned in the text and sticks the pictures on the board. Next, the teacher elicits the names of the ingredients and writes them next to their corresponding picture. Finally, the teacher asks the students to read the text quickly and circle the ingredients.",
      "C": "The teacher asks the students to read the text and answer the following questions: Have you ever tried this dish? Would you like to try it? Why/Why not? Is there a similar dish in your country? How similar or different is it? Next, the students discuss the questions in pairs. Finally, some students share their answers aloud."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Para hacer el texto significativo conviene conectar el contenido con la experiencia y cultura de los estudiantes. C les pide relacionar el plato con su realidad y opinar sobre el texto."
  },
  {
    "id": 9,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "",
    "prompt": "During the past few sessions, Ursula's students have been talking about actions that started in the past but continue up to the present. During a semi-controlled group activity, she overhears a couple of students say: \"I have been to the movies last Saturday\" and \"My mother has visited Piura last year\". Aware of the students' mistakes, Ursula wants to help her students correct their mistakes. Which of the following strategies is appropriate to carry out?",
    "options": {
      "A": "The teacher makes a pause and draws a timeline on the board. Then she elicits examples of activities the students have done recently and writes them on the timeline. Next, she asks the students to say when the actions started and if they have finished or not. Also, they analyze if it is important to specify the time. After that, the students retake the activity and say the sentences again correcting their mistakes.",
      "B": "The teacher stops the activity for a moment. Then she asks the students to pay attention to their peers' sentences and try to identify when they make mistakes using the target language. She tells them that every time a student identifies a mistake, they should correct it. Next, the students continue working on the activity. The teacher approaches the groups in order to provide help if needed.",
      "C": "The teacher approaches the students who have made mistakes and kindly explains to them how to use the target language correctly. After that, she gives the students some minutes to write, in their notebooks, some sentences using the target language correctly. Next, the students read their sentences aloud. Finally, the students go back to the task and continue with the group work."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "A corrige el error desde el uso del present perfect y las expresiones de tiempo mediante una linea de tiempo. Asi los estudiantes comprenden por que \"last Saturday\" y \"last year\" no encajan con esa forma."
  },
  {
    "id": 10,
    "module": "didactics",
    "topic": "Classroom didactics and writing/reading setup",
    "stimulus": "",
    "prompt": "Amanda wants the students in her class to use the following expressions in a dialogue: - I'd rather go to ... - It's very kind of you, but... - Actually, I think I'm going to pass on it. - Let me sleep on it. Which of the following language functions is Amanda trying to promote with the expressions above?",
    "options": {
      "A": "Disagreeing with an opinion.",
      "B": "Expressing preference.",
      "C": "Rejecting an offer."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Las expresiones propuestas sirven para rechazar una invitacion u oferta de manera cortes. No son principalmente desacuerdo ni simple preferencia."
  },
  {
    "id": 11,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "Read the following situation and answer questions 11, 12, 13, 14 and 15. Josefina wants her students to improve their speaking skills through a class discussion. In order to achieve her purpose, she has planned the following teaching sequence: - First, the teacher asks her students what ideas come to mind when they listen to the word \"e-mail hacking.\" The students brainstorm ideas and the teacher writes some of them on the board. - Next, she presents the following situation on the board: \"Two weeks ago, my e-mail account was hacked. I was shocked at first, so I did not take further action. A few days later, I opened a new e-mail account with a different password. Did I take the best action? Why/Why not? In your opinion, what could have been the ideal actions to take in that situation?\" - Then the teacher writes the following expressions on the board: \"It seems to me that ...,\" \"To my mind, ...,\" \"As far as I understand, ...,\" and \"From my perspective, ...\" - After that, the teacher forms groups of four students to discuss the questions shown in the situation. She encourages the students to use the expressions provided on the board, as well as the ideas they brainstormed at the beginning of the class. - The students have some minutes to discuss their ideas while the teacher walks around the class monitoring the activity. - Then the teacher gives a flipchart paper and markers to each group and asks them to make two lists: \"Actions to protect our e-mail accounts from hacking\" and \"Suggestions on what to do when an e-mail is hacked.\" - Next, each group presents their lists to the class: Two members of the group present the actions, and the other two present the suggestions. The audience asks further questions if they need clarification.",
    "prompt": "Which of the following teaching methods is NOT involved in Josefina's sequence?",
    "options": {
      "A": "Presentation - Practice - Production.",
      "B": "Problem - Based Learning.",
      "C": "Task - Based Learning."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "La secuencia no sigue Presentation-Practice-Production porque no presenta una estructura para practicarla de forma controlada y luego producirla. Si incluye analisis de problema y discusion comunicativa."
  },
  {
    "id": 12,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "Read the following situation and answer questions 11, 12, 13, 14 and 15. Josefina wants her students to improve their speaking skills through a class discussion. In order to achieve her purpose, she has planned the following teaching sequence: - First, the teacher asks her students what ideas come to mind when they listen to the word \"e-mail hacking.\" The students brainstorm ideas and the teacher writes some of them on the board. - Next, she presents the following situation on the board: \"Two weeks ago, my e-mail account was hacked. I was shocked at first, so I did not take further action. A few days later, I opened a new e-mail account with a different password. Did I take the best action? Why/Why not? In your opinion, what could have been the ideal actions to take in that situation?\" - Then the teacher writes the following expressions on the board: \"It seems to me that ...,\" \"To my mind, ...,\" \"As far as I understand, ...,\" and \"From my perspective, ...\" - After that, the teacher forms groups of four students to discuss the questions shown in the situation. She encourages the students to use the expressions provided on the board, as well as the ideas they brainstormed at the beginning of the class. - The students have some minutes to discuss their ideas while the teacher walks around the class monitoring the activity. - Then the teacher gives a flipchart paper and markers to each group and asks them to make two lists: \"Actions to protect our e-mail accounts from hacking\" and \"Suggestions on what to do when an e-mail is hacked.\" - Next, each group presents their lists to the class: Two members of the group present the actions, and the other two present the suggestions. The audience asks further questions if they need clarification.",
    "prompt": "Which of the following speaking skills is least promoted in Josefina's sequence?",
    "options": {
      "A": "Communicating ideas fluently.",
      "B": "Using nonverbal and paraverbal sources.",
      "C": "Interacting with different speakers effectively."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La actividad promueve intercambio de ideas e interaccion oral, pero no trabaja de manera explicita gestos, postura, entonacion o volumen; por eso lo menos promovido es lo no verbal y paraverbal."
  },
  {
    "id": 13,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "Read the following situation and answer questions 11, 12, 13, 14 and 15. Josefina wants her students to improve their speaking skills through a class discussion. In order to achieve her purpose, she has planned the following teaching sequence: - First, the teacher asks her students what ideas come to mind when they listen to the word \"e-mail hacking.\" The students brainstorm ideas and the teacher writes some of them on the board. - Next, she presents the following situation on the board: \"Two weeks ago, my e-mail account was hacked. I was shocked at first, so I did not take further action. A few days later, I opened a new e-mail account with a different password. Did I take the best action? Why/Why not? In your opinion, what could have been the ideal actions to take in that situation?\" - Then the teacher writes the following expressions on the board: \"It seems to me that ...,\" \"To my mind, ...,\" \"As far as I understand, ...,\" and \"From my perspective, ...\" - After that, the teacher forms groups of four students to discuss the questions shown in the situation. She encourages the students to use the expressions provided on the board, as well as the ideas they brainstormed at the beginning of the class. - The students have some minutes to discuss their ideas while the teacher walks around the class monitoring the activity. - Then the teacher gives a flipchart paper and markers to each group and asks them to make two lists: \"Actions to protect our e-mail accounts from hacking\" and \"Suggestions on what to do when an e-mail is hacked.\" - Next, each group presents their lists to the class: Two members of the group present the actions, and the other two present the suggestions. The audience asks further questions if they need clarification.",
    "prompt": "In the teaching sequence, Josefina presents the following situation: \"Two weeks ago, my e-mail account was hacked. I was shocked at first, so I did not take further action. A few days later, I opened a new e-mail account with a different password. Did I take the best action? Why/Why not? In your opinion, what could have been the ideal actions to take in that situation?\" What is Josefina's main purpose when presenting the situation above?",
    "options": {
      "A": "Set the scene of the activity.",
      "B": "Promote the students' analysis of a situation.",
      "C": "Familiarize the students with language related to the topic."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La situacion de la cuenta hackeada busca que los estudiantes analicen decisiones y propongan acciones. No es solo ambientar el tema ni presentar vocabulario."
  },
  {
    "id": 14,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "Read the following situation and answer questions 11, 12, 13, 14 and 15. Josefina wants her students to improve their speaking skills through a class discussion. In order to achieve her purpose, she has planned the following teaching sequence: - First, the teacher asks her students what ideas come to mind when they listen to the word \"e-mail hacking.\" The students brainstorm ideas and the teacher writes some of them on the board. - Next, she presents the following situation on the board: \"Two weeks ago, my e-mail account was hacked. I was shocked at first, so I did not take further action. A few days later, I opened a new e-mail account with a different password. Did I take the best action? Why/Why not? In your opinion, what could have been the ideal actions to take in that situation?\" - Then the teacher writes the following expressions on the board: \"It seems to me that ...,\" \"To my mind, ...,\" \"As far as I understand, ...,\" and \"From my perspective, ...\" - After that, the teacher forms groups of four students to discuss the questions shown in the situation. She encourages the students to use the expressions provided on the board, as well as the ideas they brainstormed at the beginning of the class. - The students have some minutes to discuss their ideas while the teacher walks around the class monitoring the activity. - Then the teacher gives a flipchart paper and markers to each group and asks them to make two lists: \"Actions to protect our e-mail accounts from hacking\" and \"Suggestions on what to do when an e-mail is hacked.\" - Next, each group presents their lists to the class: Two members of the group present the actions, and the other two present the suggestions. The audience asks further questions if they need clarification.",
    "prompt": "In the teaching sequence, Josefina writes the following expressions on the board: - It seems to me that ... - To my mind, ... - As far as I understand, ... - From my perspective, ... Which of the following language functions is she trying to promote with those expressions?",
    "options": {
      "A": "Being vague.",
      "B": "Stating facts.",
      "C": "Expressing opinions."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Las frases \"It seems to me\", \"To my mind\" y similares introducen opiniones personales. Por eso la funcion es expresar opiniones."
  },
  {
    "id": 15,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "Read the following situation and answer questions 11, 12, 13, 14 and 15. Josefina wants her students to improve their speaking skills through a class discussion. In order to achieve her purpose, she has planned the following teaching sequence: - First, the teacher asks her students what ideas come to mind when they listen to the word \"e-mail hacking.\" The students brainstorm ideas and the teacher writes some of them on the board. - Next, she presents the following situation on the board: \"Two weeks ago, my e-mail account was hacked. I was shocked at first, so I did not take further action. A few days later, I opened a new e-mail account with a different password. Did I take the best action? Why/Why not? In your opinion, what could have been the ideal actions to take in that situation?\" - Then the teacher writes the following expressions on the board: \"It seems to me that ...,\" \"To my mind, ...,\" \"As far as I understand, ...,\" and \"From my perspective, ...\" - After that, the teacher forms groups of four students to discuss the questions shown in the situation. She encourages the students to use the expressions provided on the board, as well as the ideas they brainstormed at the beginning of the class. - The students have some minutes to discuss their ideas while the teacher walks around the class monitoring the activity. - Then the teacher gives a flipchart paper and markers to each group and asks them to make two lists: \"Actions to protect our e-mail accounts from hacking\" and \"Suggestions on what to do when an e-mail is hacked.\" - Next, each group presents their lists to the class: Two members of the group present the actions, and the other two present the suggestions. The audience asks further questions if they need clarification.",
    "prompt": "Finally, Josefina wants to wrap-up her lesson. Which of the following activities is better to achieve the teacher's purpose?",
    "options": {
      "A": "Tell the students to mention the most important things they have learned about e-mail hacking. Ask the students to share the solutions they consider more effective from the ones their classmates have presented.",
      "B": "Narrate the activities the students have done during the lesson so that they know the different steps they have followed. Mention the accomplished objectives of the lesson and the language they have learned.",
      "C": "Ask the students to think of another experience of e-mail hacking they have heard or read about recently. Invite some of the students to share the experience with the rest of the class."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Un cierre debe recuperar aprendizajes y conectar con lo trabajado. A pide mencionar lo aprendido y comparar soluciones, lo que sintetiza la sesion."
  },
  {
    "id": 16,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "",
    "prompt": "It is almost the end of the school year, so Gabriel wants his students to write a speech for their graduation ceremony. Before the students write their speeches, he asks them the following questions: - Is a speech formal, semi-formal or informal? - What sequence markers should you use to organize your speech? - What words or phrases can you use to connect with the audience? What kind of questions is Gabriel using?",
    "options": {
      "A": "Content checking questions.",
      "B": "Concept checking questions.",
      "C": "Instruction checking questions."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Las preguntas verifican conceptos del genero discursivo: formalidad, marcadores y recursos para conectar con la audiencia. No comprueban instrucciones de una tarea."
  },
  {
    "id": 17,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "",
    "prompt": "Leopoldo's students have been doing several listening comprehension exercises using an audio about two people discussing the pros and cons of allowing students to use cell phones in school. Now, Leopoldo wants his students to develop their critical thinking skills. Which of the following activities is least appropriate to achieve his purpose?",
    "options": {
      "A": "The teacher asks the students to recognize how the speakers in the audio feel about the topic of allowing students to use cell phones in school. The students have to support their answers using keywords from the audio.",
      "B": "The teacher asks the students to decide if the ideas about the use of cell phones in school mentioned by the speakers are evident in their school as well. The students have to give examples based on their own experiences.",
      "C": "The teacher asks the students to mention whether they agree or disagree with the speakers' arguments for and against the use of cell phones in school. The students have to support their ideas and react to what their classmates have said."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Reconocer sentimientos con palabras clave es comprension literal o inferencial basica. Desarrolla menos pensamiento critico que evaluar argumentos, relacionarlos con la realidad o tomar postura."
  },
  {
    "id": 18,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "",
    "prompt": "Margarita's students are going to participate in a presentation about the importance of keeping streets clean. She groups the students to practice their speeches for the presentation. While they are practicing, Margarita notices that her students hesitate quite often and start using Spanish fillers such as \"bueno\" and \"este.\" Thus, she wants to help her students sound more natural while they present their speeches. Which of the strategies below would be more appropriate for this purpose?",
    "options": {
      "A": "Approach the students who use Spanish fillers in a sentence and gently provide them with a proper filler in English such as \"Well...,\" \"I mean...,\" \"You know...,\" and some others. Then ask the students to repeat their sentence using the filler provided.",
      "B": "Write, on the board, some common fillers in English and tell the students they can use them whenever they forget how to continue an idea. Next, encourage the students to use those fillers as they practice their speeches if necessary.",
      "C": "Tell the students to avoid using fillers as they make them sound less fluent when speaking or talking to others. Also, give the students more time for them to practice as many times as necessary until they know their speeches well enough."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "B ofrece fillers naturales en ingles para mantener la fluidez cuando olvidan una idea. Prohibir fillers o corregir solo casos aislados no ayuda tanto a sonar natural."
  },
  {
    "id": 19,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "",
    "prompt": "Antonia's students are going to debate on the statement \"Junk food should be banned in schools.\" She wants her students to use the following expressions while debating: - I beg your pardon? - Sorry to butt in, but... - I don't quite see what you mean. - Can I add something here? Which two language functions does Antonia want her students to practice?",
    "options": {
      "A": "Apportioning blame / apologizing.",
      "B": "Asking for information / arranging one's ideas.",
      "C": "Expressing lack of understanding / interrupting someone."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "\"I do not quite see what you mean\" expresa falta de comprension y \"Sorry to butt in\" o \"Can I add something here?\" sirven para interrumpir o tomar turno."
  },
  {
    "id": 20,
    "module": "speaking",
    "topic": "Speaking skills, functions and lesson sequence",
    "stimulus": "",
    "prompt": "Tina's students have been talking about their favorite dish. Now, she wants them to participate in a communicative oral activity using that topic. Which of the following strategies is it more appropriate to carry out?",
    "options": {
      "A": "The students write the recipe of their favorite dish in their notebooks. Next, they read it aloud to the whole class. Finally, the teacher invites some volunteers to recall the ingredients mentioned in the recipe.",
      "B": "The students record a video in which they give instructions to prepare their favorite dish. The teacher asks the students to use simple language for their classmates to understand the instructions given. Finally, the teacher plays some of the videos in class.",
      "C": "The students ask five peers what their favorite dish is, why they like it and what ingredients it is made of. Then they compare and analyze the answers they got in order to find out similarities and differences. Finally, the students share their findings with the class."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "C genera comunicacion real: los estudiantes preguntan a varios companeros, comparan respuestas y reportan hallazgos. Las otras opciones son mas monologicas o escritas."
  },
  {
    "id": 21,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "",
    "prompt": "During a reading session, Oswaldo's students are giving the text a first reading. While reading, a student raises his hand and asks the teacher for the meaning of the phrasal verb \"back up.\" Which of the following actions is better for the teacher to carry out?",
    "options": {
      "A": "Tell the student that, at this point, it is important to understand the general idea. Then point out that there will be a moment to check vocabulary as a whole class. When the students finish reading, ask them to circle the words they don't understand in order to clarify their meaning.",
      "B": "Tell the student that the phrasal verb \"back up\" is similar in meaning to \"support\" or \"confirm,\" but that it's more informal. Then give the student an example using \"back up.\" After that, encourage the student to think of another situation in which he could use that phrasal verb.",
      "C": "Tell the student what a phrasal verb is and explain the meaning of \"back up\" in English. If the student doesn't understand the meaning of that phrasal verb, translate it into Spanish. Finally, ask the student if he has problems with the meaning of other words in the text."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Durante una primera lectura conviene preservar el objetivo global. A posterga el vocabulario para no interrumpir la comprension general del texto."
  },
  {
    "id": 22,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "",
    "prompt": "Stefano's students are going to write a review of a movie they have seen recently. First, the teacher wants the students to get familiar with the elements of a movie review. Which of the following activities is most appropriate to achieve his purpose?",
    "options": {
      "A": "The teacher groups the students and gives each group two samples of movie reviews and a chart with the following labels: title, genre, actors and director, music, photography, and plot. Then the students read the samples and complete the chart listing the elements found.",
      "B": "The teacher hands each student a copy of a word search puzzle that contains a list of words related to the elements of a movie review. Then the students look for the words on the puzzle, circle them and compare their answers in pairs.",
      "C": "The teacher pairs up the students and asks them to answer the following questions: \"What's a movie review?\" and \"What elements does it have?\" Then the teacher elicits the answers from the students and clarifies doubts if necessary."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Para familiarizarse con una resena, los estudiantes deben observar modelos y reconocer sus elementos. A usa muestras reales y una tabla de componentes del genero."
  },
  {
    "id": 23,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "",
    "prompt": "Hugo's students are reading a short poem. Here is an excerpt of the poem: Up in the apple tree there is an apple so big and round... Climb up the tree and hold on tight Pick that round apple and take a big bite. Which of the following grammatical structures is the teacher mainly trying to promote with the poem?",
    "options": {
      "A": "Adverbs.",
      "B": "Quantifiers.",
      "C": "Imperatives."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "El poema repite ordenes como \"Climb\", \"hold\", \"Pick\" y \"take\". Esas formas son imperativos."
  },
  {
    "id": 24,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "",
    "prompt": "Marcelo's students are practicing a conversation in which they are sharing personal information such as name, telephone number and e-mail address. He notices that some students have difficulties pronouncing phonemes such as b/v, c/z, m/n, a/e, i/y, and so on when spelling words. He wants to help his students pronounce those phonemes better. Which of the following strategies is appropriate to achieve the teacher's purpose?",
    "options": {
      "A": "Have the students use linking sounds.",
      "B": "Have the students recognize minimal pairs.",
      "C": "Have the students practice contrastive stress."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Las dificultades descritas son de contraste entre sonidos. Trabajar minimal pairs ayuda a distinguir y producir fonemas parecidos como b/v o m/n."
  },
  {
    "id": 25,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "",
    "prompt": "Victor's students have written a text in which they give advice to a friend. Now, the teacher is correcting the students' texts. Here is a comment he has written in one of the students' texts: \"This is a great text. You have included really useful pieces of advice to help your friend solve a problem. However, you could have used more of the expressions to give advice we studied in our previous sessions.\" Based on the comment above, what was Victor's feedback focus?",
    "options": {
      "A": "Organization.",
      "B": "Accuracy.",
      "C": "Range."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "El comentario valora el texto, pero senala que faltaron mas expresiones para dar consejos. Eso se relaciona con rango o variedad de recursos linguisticos."
  },
  {
    "id": 26,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "Read the following situation and answer questions 26, 27, 28 and 29. Romina wants to help her students develop their reading skills using the following text: Weekends at grandma's Ben loved spending his weekends at his grandma's house. Every Saturday morning, Ben's parents would take him to spend all the weekend with grandma. Her place was a cozy house with different plants and trees. Every Saturday, as soon as Ben arrived, he would run outside to look at the plants. He loved picking fruit such as strawberries, grapes and apples, as well as playing with grandma's cat inside the house. In the afternoon, grandma would cook with Ben's help. He always helped her prepare lunch. Grandma was an excellent and renowned cook in town, so every dish was awesome. During the evening, they would spend their time drawing pictures, playing games, and going for walks. Later, on Saturday night, Ben and grandma would make a delicious dinner and watch old movies together before going to bed. On Sunday, grandma would take Ben to the nearby park to feed the doves together. Then they would have some street food before Ben's parents pick him again. All in all, Ben cherished these wonderful memories with grandma and she loved sharing her passion for food with someone she loved so dearly. Adapted from ESLFast.com.(n.d.).Weekends at Grandma's. Retrieved from https://n9.cl/3pkuw2",
    "prompt": "Romina has thought of three different strategies to have her students work on the text. Which of the following strategies she has thought of belongs to the top-down processing?",
    "options": {
      "A": "Group the students and provide each group with a set of cards. Each set of cards has some expressions from the text, as well as some pictures that depict those expressions. Ask the groups to match each expression with a picture. Next, provide each student with a copy of the text, ask them to read it and highlight the expressions they have seen some minutes ago.",
      "B": "Stick on the board some pictures related to the text. Ask the students to get in pairs and tell them to discuss what the story will be about based on those pictures. Then give each student a copy of the text and ask them to read it for a few minutes. Finally, encourage the students to say whether their guesses were right or wrong.",
      "C": "Write on the board a list of adjectives extracted from the text. Provide each student with a copy of the text with gaps in it to be filled with adjectives from the board. Next, pair up the students and ask them to fill in the gaps. Finally, ask some volunteers to share their answers with the whole class."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Top-down usa conocimientos previos, imagenes y predicciones antes de leer. B activa anticipaciones sobre la historia y luego las contrasta con el texto."
  },
  {
    "id": 27,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "Read the following situation and answer questions 26, 27, 28 and 29. Romina wants to help her students develop their reading skills using the following text: Weekends at grandma's Ben loved spending his weekends at his grandma's house. Every Saturday morning, Ben's parents would take him to spend all the weekend with grandma. Her place was a cozy house with different plants and trees. Every Saturday, as soon as Ben arrived, he would run outside to look at the plants. He loved picking fruit such as strawberries, grapes and apples, as well as playing with grandma's cat inside the house. In the afternoon, grandma would cook with Ben's help. He always helped her prepare lunch. Grandma was an excellent and renowned cook in town, so every dish was awesome. During the evening, they would spend their time drawing pictures, playing games, and going for walks. Later, on Saturday night, Ben and grandma would make a delicious dinner and watch old movies together before going to bed. On Sunday, grandma would take Ben to the nearby park to feed the doves together. Then they would have some street food before Ben's parents pick him again. All in all, Ben cherished these wonderful memories with grandma and she loved sharing her passion for food with someone she loved so dearly. Adapted from ESLFast.com.(n.d.).Weekends at Grandma's. Retrieved from https://n9.cl/3pkuw2",
    "prompt": "After the students have read the text, Romina wants them to understand the use of the transitions included in it. Which of the following strategies is more appropriate to carry out?",
    "options": {
      "A": "The teacher writes, on the board, five incomplete sentences and under each sentence three possible transitions to complete that sentence. Next, in pairs, the students have some minutes to choose the correct answer for each sentence. Finally, some volunteers say their answers aloud, and the teacher corrects if necessary.",
      "B": "The teacher pairs up the students and provides each pair with a list of other transitions. Next, she asks the students to replace the transitions from the text with some of the words from the list. Finally, the students compare their answers, and some volunteers read the texts to the whole class.",
      "C": "The teacher asks the students to circle all the transitions they see in the text. Then she pairs up the students and asks them to discuss what the purpose of each transition within sentences is. Finally, some students share their answers with the whole class, and the teacher clarifies doubts if needed."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Para entender transiciones, no basta elegirlas o sustituirlas. C pide identificarlas en el texto y discutir su funcion dentro de las oraciones."
  },
  {
    "id": 28,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "Read the following situation and answer questions 26, 27, 28 and 29. Romina wants to help her students develop their reading skills using the following text: Weekends at grandma's Ben loved spending his weekends at his grandma's house. Every Saturday morning, Ben's parents would take him to spend all the weekend with grandma. Her place was a cozy house with different plants and trees. Every Saturday, as soon as Ben arrived, he would run outside to look at the plants. He loved picking fruit such as strawberries, grapes and apples, as well as playing with grandma's cat inside the house. In the afternoon, grandma would cook with Ben's help. He always helped her prepare lunch. Grandma was an excellent and renowned cook in town, so every dish was awesome. During the evening, they would spend their time drawing pictures, playing games, and going for walks. Later, on Saturday night, Ben and grandma would make a delicious dinner and watch old movies together before going to bed. On Sunday, grandma would take Ben to the nearby park to feed the doves together. Then they would have some street food before Ben's parents pick him again. All in all, Ben cherished these wonderful memories with grandma and she loved sharing her passion for food with someone she loved so dearly. Adapted from ESLFast.com.(n.d.).Weekends at Grandma's. Retrieved from https://n9.cl/3pkuw2",
    "prompt": "Once the students have practiced different reading skills, Romina wants her students to work on a post-reading task. Which of the following activities is appropriate to achieve her purpose?",
    "options": {
      "A": "Ask the students to think of some questions to know more information about the characters. Next, group the students and ask them to work together to come up with the possible answers for those questions. Finally, tell the students to share their questions and answers with the class.",
      "B": "Stick a piece of flipchart paper with some expressions used to summarize information. Then pair up the students and ask them to say what the content of the text was by using some of the expressions provided. Finally, invite some volunteers to share their summaries with the rest of the class.",
      "C": "Write, on the board, some comprehension questions to be answered with information from the text. Ask the students to answer the questions individually. Group the students and tell them to compare their answers; then call some volunteers to read their answers to the whole class."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Una tarea post-reading debe ir mas alla de comprobar datos. A invita a generar preguntas y posibles respuestas sobre los personajes, extendiendo la comprension del texto."
  },
  {
    "id": 29,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "Read the following situation and answer questions 26, 27, 28 and 29. Romina wants to help her students develop their reading skills using the following text: Weekends at grandma's Ben loved spending his weekends at his grandma's house. Every Saturday morning, Ben's parents would take him to spend all the weekend with grandma. Her place was a cozy house with different plants and trees. Every Saturday, as soon as Ben arrived, he would run outside to look at the plants. He loved picking fruit such as strawberries, grapes and apples, as well as playing with grandma's cat inside the house. In the afternoon, grandma would cook with Ben's help. He always helped her prepare lunch. Grandma was an excellent and renowned cook in town, so every dish was awesome. During the evening, they would spend their time drawing pictures, playing games, and going for walks. Later, on Saturday night, Ben and grandma would make a delicious dinner and watch old movies together before going to bed. On Sunday, grandma would take Ben to the nearby park to feed the doves together. Then they would have some street food before Ben's parents pick him again. All in all, Ben cherished these wonderful memories with grandma and she loved sharing her passion for food with someone she loved so dearly. Adapted from ESLFast.com.(n.d.).Weekends at Grandma's. Retrieved from https://n9.cl/3pkuw2",
    "prompt": "Finally, Romina wants her students to work on an extensive task as homework. Which of the following tasks is appropriate to assign?",
    "options": {
      "A": "The teacher asks the students to write a similar text, but using their own information. Also, she mentions that they have to include five or six linking words to connect their ideas. Finally, they will read their texts to the whole class during the following session.",
      "B": "The teacher brings copies of a text about people visiting someone loved. The text has some blanks in it for the students to complete with words that fit the context of the text. Finally, during the following session, the students compare their answers with a peer.",
      "C": "The teacher encourages the students to read a brief text related to the topic. She points out that they can choose the text they prefer. In the following session, the students will say if they liked the text they read or not and explain why."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La lectura extensiva implica leer mas por interes y autonomia. C permite elegir un texto relacionado y luego comentar si les gusto y por que."
  },
  {
    "id": 30,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "",
    "prompt": "Eulogio wants his students to infer information from the audio of a story. Which of the following activities develops that skill appropriately?",
    "options": {
      "A": "Ask the students to pay attention to the expressions the characters used in the story. Encourage the students to say if the characters know each other and explain why.",
      "B": "Ask the students to take notes on the most important ideas included in the story. Encourage the students to write a summary including that information.",
      "C": "Ask the students to choose the moment from the story they liked or didn't like the most. Encourage the students to support their ideas."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Inferir requiere deducir informacion no dicha explicitamente. A usa expresiones de los personajes para deducir si se conocen y justificar la respuesta."
  },
  {
    "id": 31,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "Read the following situation and answer questions 31 and 32. Mario wants his students to improve their reading skills. He has planned a session about product reviews.",
    "prompt": "After having done some reading comprehension activities, Mario tells the students to paraphrase, orally, the review of the microwave oven, which is the following: I'm sorry to say I'm very disappointed with this microwave oven. It's big, awful and very heavy, so I can't carry it. It's also very difficult to use. So overall, it's definitely not worth the money and it's very poor value. Also, it was nearly two weeks late. My advice is don't buy it. Jen Swift Retrieved from Hugues, J. & Wood, K. (2019). Navigate Elementary. Unit 5 p 53. Oxford University Press. These are some of the students' samples. Which one shows paraphrasing skills?",
    "options": {
      "A": "Juan says: \"Jen is very mad at the company that sent her the product. I think the product is ugly and big so I wouldn't buy it. It was too expensive and didn't arrive on time. In my opinion, the product is terrible and the company, too.\"",
      "B": "Alicia says: \"Jen is really unhappy with a product. The product is large, horrible, weighty and not easy to operate. In general, it is not good value for money. Besides, it arrived two weeks late approximately. She recommends not buying it.\"",
      "C": "Lucia says: \"Jen is very disappointed with this product. It's big, awful, and very heavy so she can't carry it. It's also very difficult to use. It is definitely not worth the money and it's poor value. Also, it was nearly two weeks late. Her advice is don't buy it.\""
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Parafrasear es mantener el sentido usando otras palabras. B reformula ideas del texto sin agregar opiniones personales y sin copiar tanto como C."
  },
  {
    "id": 32,
    "module": "reading-writing",
    "topic": "Reading, writing and post-reading tasks",
    "stimulus": "Read the following situation and answer questions 31 and 32. Mario wants his students to improve their reading skills. He has planned a session about product reviews.",
    "prompt": "Mario wants his students to work on a meaningful extension activity in which they will write a product review. He has thought of three different activities. Which of the activities Mario has thought of is appropriate to achieve his purpose?",
    "options": {
      "A": "The teacher brings cards with the name of different products in each one. He asks the students to randomly pick a card. After that, they write a review of the product.",
      "B": "The teacher gives the students a review of a product. He asks them to highlight the key words in it. Then they rewrite the review substituting the key words.",
      "C": "The teacher tells the students to think about the products they have at home. He asks them to choose one of those products. Next, they write a review of it."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Una extension significativa debe conectar la tarea con la vida del estudiante. C les pide elegir un producto real de casa y escribir una resena propia."
  },
  {
    "id": 33,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "",
    "prompt": "Daniel's students are going to give an oral presentation about pollution effects in the environment. He provides the students with a list of expressions to be used during the presentation. Here are some of those expressions: - I'd like to put the situation into some kind of perspective. - I'd like you to think about the significance of this figure here. - Whichever way you look at it, the underlying trend is clear. Which of the following language functions is involved in the expressions provided by the teacher?",
    "options": {
      "A": "Highlighting information.",
      "B": "Introducing the topic.",
      "C": "Sequencing events."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Las expresiones buscan resaltar la importancia de datos, figuras o tendencias. Por eso la funcion principal es destacar informacion."
  },
  {
    "id": 34,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 34, 35, 36 and 37. Florencia wants her students to develop their listening skills using a radio spot in English of the Pan American and Parapan American Games 2019. With that purpose in mind, she has designed different activities.",
    "prompt": "Before listening to the radio spot, Florencia wants to activate her students' prior knowledge on the topic in a communicative way. Which of the following strategies is it appropriate to carry out?",
    "options": {
      "A": "Bring a word search puzzle with some words related to the Pan American and Parapan American Games. Give the students some minutes to find the words in the word search puzzle. Finally, ask the students to get in pairs and compare the words they found.",
      "B": "Give each student a worksheet with a matching exercise about the Pan American and Parapan American Games. The exercise has two columns with phrases under each column. Tell the students to choose one phrase from each column and connect them in order to make a sentence.",
      "C": "Write the title \"Pan American and Parapan American Games 2019\" on the board. Provide the students with prompts such as: \"I think that...,\" \"Some sports played at this event are...,\" etc. Ask the students to stand up, find a peer and start a dialogue about the games using the prompts provided."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "C activa conocimientos previos de forma comunicativa porque los estudiantes dialogan sobre el tema antes de escuchar. A y B son ejercicios mas mecanicos."
  },
  {
    "id": 35,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 34, 35, 36 and 37. Florencia wants her students to develop their listening skills using a radio spot in English of the Pan American and Parapan American Games 2019. With that purpose in mind, she has designed different activities.",
    "prompt": "Florencia asks her students to listen to the following radio spot: \"The Pan American and Parapan American Games are about to start. There will be athletes from different countries such as USA, Brazil, Mexico, Canada, Cuba, Argentina, Colombia, Chile, Peru, Ecuador, Venezuela, Jamaica and some others. Don't miss this opportunity to see sports like basketball, handball, bowling, boxing, badminton, baseball and many more. Look for information about venues, ticket prices, dates and schedules at Lima2019.pe!\" Then she asks the students to come up with a phrase or sentence that expresses what the audio is about. Which of the following listening skills is being developed through this activity?",
    "options": {
      "A": "Listening for gist.",
      "B": "Predicting content.",
      "C": "Listening for details."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Pedir una frase sobre de que trata el audio apunta a captar la idea general. Eso es listening for gist."
  },
  {
    "id": 36,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 34, 35, 36 and 37. Florencia wants her students to develop their listening skills using a radio spot in English of the Pan American and Parapan American Games 2019. With that purpose in mind, she has designed different activities.",
    "prompt": "Now, the students listen to the radio spot again and write down the sports mentioned in the audio. Which of the following listening skills is being developed through this activity?",
    "options": {
      "A": "Paraphrasing.",
      "B": "Detecting connectors.",
      "C": "Listening for specific information."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Anotar los deportes mencionados exige localizar datos concretos en el audio. Esa habilidad es listening for specific information."
  },
  {
    "id": 37,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 34, 35, 36 and 37. Florencia wants her students to develop their listening skills using a radio spot in English of the Pan American and Parapan American Games 2019. With that purpose in mind, she has designed different activities.",
    "prompt": "Next, the teacher wants her students to work on a post-listening task to develop their speaking skills. Which of the following tasks is appropriate to achieve the teacher's purpose?",
    "options": {
      "A": "Ask the students to record their own radio spot for a sports event in their community. Tell them to include some features of the spot they have just listened to such as speaker's intonation and adjectives. Encourage the students to add other relevant information like prices, locations, schedules, etc.",
      "B": "Play the radio spot again and ask the students to write as much information as possible in their notebooks. Tell them to use their notes to write a new version of the spot but using their own words. Invite some volunteers to read their own versions of the spot aloud.",
      "C": "Give each student a worksheet that contains the radio spot with some blanks in it. Ask the students to listen carefully and fill in the blanks with the appropriate words. Pair up the students and ask them to compare their answers for some minutes."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Como post-listening orientado al speaking, A transforma el input en una produccion oral: crear y grabar un nuevo spot. B es mas de escritura y C sigue siendo escucha controlada."
  },
  {
    "id": 38,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "",
    "prompt": "Fernanda's students are having a conversation in which they are using the following expressions: - Hey, what happened? - I swear I didn't mean to be late. - Did you miss the bus or something? - I hope you didn't wait for a long time. Which language function is NOT involved in the expressions provided?",
    "options": {
      "A": "Asking for explanations.",
      "B": "Offering apologies.",
      "C": "Making promises."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "Las expresiones incluyen pedir explicaciones y disculparse. No desarrollan realmente hacer promesas, aunque aparezca \"I swear\" como enfasis de disculpa."
  },
  {
    "id": 39,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "",
    "prompt": "Alejandro's students are going to write a paragraph on \"The advantages and disadvantages of working out.\" He wants his students to follow the process writing approach. Here is the sequence he has designed: - The teacher plays a video of people working out at a gym. In the video, a reporter interviews those people. The teacher writes the following questions on the board: - How often do the interviewees work out? - What are the advantages and disadvantages of working out that they mentioned? - Then the teacher pairs up the students and tells them to discuss the questions on the board. - After the students discuss the questions, some volunteers share their ideas with the whole class. - Next, the teacher tells the students to draw a chart in their notebooks. The chart should contain two labels: \"advantages\" and \"disadvantages\" of working out. Individually, the students write some ideas under each label. - The teacher tells the students to write a paragraph using the ideas from their charts. Once the students are done writing, the teacher pairs them up. - After that, the teacher asks the students to exchange their paragraphs, check whether the message is clear and whether the purpose has been achieved. Additionally, the students identify misspelled words, punctuation mistakes, etc. Then they give each other oral feedback on how to improve their paragraphs. - Finally, they return each other's paragraphs and make the improvements they consider necessary. Then they submit their paragraphs for correction. Which writing stage has been best promoted in the sequence above?",
    "options": {
      "A": "Planning.",
      "B": "Drafting.",
      "C": "Revising."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La secuencia enfatiza intercambio de borradores, revision de claridad, errores y mejoras. Ese trabajo corresponde a revising."
  },
  {
    "id": 40,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "",
    "prompt": "Marlon's students have been talking about movies using present perfect and simple past tenses. Now, he wants his students to develop their oral fluency in a freer way. He carries out the following sequence: - First, the teacher elicits some vocabulary related to movies and writes it on the board. Additionally, he elicits which forms are used to talk about recent past events. - Next, the teacher pairs up the students and tells them to ask each other questions to get information about the movie they have seen recently. - After the students have talked for some minutes, they stand up and look for a different classmate and repeat the procedure. - While the students are working, the teacher monitors. When he notices a student makes a mistake, he corrects the student on the spot. - Finally, on the board, the teacher writes some of the mistakes the students made during the activity and elicits the correct form from the students. Given the teacher's purpose, which of the following criticisms of this sequence is appropriate?",
    "options": {
      "A": "The teacher shouldn't have corrected the students' mistakes while they were performing the task.",
      "B": "The teacher shouldn't have written, on the board, the mistakes the students made during the activity and elicited the correct form.",
      "C": "The teacher shouldn't have recycled vocabulary related to the topic and reminded the structures used to talk about recent past events."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "Si el objetivo es fluidez oral libre, corregir en el momento interrumpe la comunicacion. La retroalimentacion diferida es mas adecuada para no cortar el flujo."
  },
  {
    "id": 41,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 41, 42 and 43. Basilio wants his students to write a text about the places they can find in their towns using the task-based learning method. He has planned the following activities.",
    "prompt": "As a first step of the session, Basilio does the following activities: - First, the students watch a video of interesting towns around the world. - Then the students write down the places and things they see in these towns such as buildings, parks, shops, etc. - Finally, the students work in small groups and take turns describing the towns from the video. Which of the following purposes is mainly involved in Basilio's activity?",
    "options": {
      "A": "Working on students' writing skills.",
      "B": "Familiarizing students with the topic.",
      "C": "Setting up the context of the activity."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Ver un video, listar lugares y describirlos familiariza a los estudiantes con el tema y el vocabulario antes de la tarea principal."
  },
  {
    "id": 42,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 41, 42 and 43. Basilio wants his students to write a text about the places they can find in their towns using the task-based learning method. He has planned the following activities.",
    "prompt": "Now, for the while-task stage, Basilio's students are going to write their text. Which of the following activities is appropriate to carry out at this stage?",
    "options": {
      "A": "Give each student a sample text describing a town. Ask the students to identify the elements found in the text and then elicit the answers. Next, ask the students to write about their own town using the sample as a model.",
      "B": "Ask the students to think about the places in their towns. Then give the students five minutes to write a paragraph describing those places. Finally, ask the students to revise their paragraph and make some improvements if necessary.",
      "C": "Have the students work in pairs and create a flyer about their town. Ask them to include information about what their towns have or don't have. When they finish, tell them to exchange their flyers with another pair in order to give each other suggestions on how to improve their flyers."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "En task-based learning, el while-task debe centrarse en cumplir una tarea comunicativa. Crear un flyer en parejas con intercambio de sugerencias cumple ese proposito."
  },
  {
    "id": 43,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "Read the following situation and answer questions 41, 42 and 43. Basilio wants his students to write a text about the places they can find in their towns using the task-based learning method. He has planned the following activities.",
    "prompt": "During the post-task stage, Basilio collects his students' writings in order to provide feedback. Which of the following strategies displays reflective feedback?",
    "options": {
      "A": "Give guiding comments such as \"Make sure the verb and noun agree in number,\" \"What could be the best way to say this idea using plural?,\" and some others. Then ask the students to make improvements to their texts using the comments as guidelines.",
      "B": "Focus on the positive characteristics of the writings to encourage and motivate the students. Use phrases such as \"Well done! You have included lots of interesting ideas,\" \"Your sentences are very clear. Keep up the good work!,\" and some others.",
      "C": "Show the list of correction codes to the students and explain what they mean. Then mark all the grammar, vocabulary and spelling mistakes using these codes and ask the students to rewrite their texts following the corrections made."
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "La retroalimentacion reflexiva guia al estudiante a pensar y mejorar. A usa comentarios y preguntas orientadoras, no solo marcas o elogios generales."
  },
  {
    "id": 44,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "",
    "prompt": "Zaira's students are about to read the text \"The next wave of social media.\" Before the students start reading, she wants to make sure they are familiar with key lexical items that appear in the text. Which of the following activities is most appropriate to carry out?",
    "options": {
      "A": "The teacher writes, on the board, a list of words that will appear in the text and adds their meaning next to them. Then she reads the words aloud one by one and asks the whole class to pronounce after her. Next, she calls on some volunteers to read the words. Finally, she corrects some mispronounced words if necessary.",
      "B": "The teacher pairs up the students. Next, she provides each pair with a worksheet in which there are words from the text that have some missing letters. She gives the students some minutes to fill in the missing letters. Finally, the students compare their answers with another pair and then read the words aloud for the whole class.",
      "C": "The teacher sticks, on the walls, six pictures that depict vocabulary to understand the text. Then she gives each student some post-it notes for them to describe the pictures using words or phrases. Next, the students stick the post-it notes next to each picture. Finally, the whole class, with the help of the teacher, defines the content of the pictures shown."
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "C presenta el vocabulario mediante imagenes, descripciones y construccion colectiva de significado. Es mas contextual y activa que copiar definiciones o completar letras."
  },
  {
    "id": 45,
    "module": "feedback-listening",
    "topic": "Listening, feedback and task-based learning",
    "stimulus": "",
    "prompt": "Roberto's students are going to design a timeline in pairs about their favorite singer's life. Roberto has already given instructions on how to design the timeline and now, the students are working in pairs. While monitoring, he overhears the following dialogue: Ana says: Did you understand the teacher's instructions? Carmen says: Yes! If I got it right, we have to make a timeline about our favorite singer's life. Ana says: Does it mean we have to include all the information about the singer in the timeline? Carmen says: Not exactly. In fact, we have to organize the events of the singer's life in a logical sequence and in a concise way. Ana says: Ok, I got it! We have to focus on relevant events of the singer s life. Carmen says: Yes, that's right! Which of the following language functions are the expressions in bold related to?",
    "options": {
      "A": "Asking for repetition.",
      "B": "Clarifying information.",
      "C": "Summarizing information."
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Las expresiones del dialogo comprueban y precisan lo entendido: \"If I got it right\", \"Does it mean\" y \"Not exactly\". Su funcion es clarificar informacion."
  },
  {
    "id": 46,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (46).",
    "options": {
      "A": "batter",
      "B": "assault",
      "C": "bombard"
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La colocacion natural es \"bombard people with things to buy\": significa exponerlos intensamente a muchos anuncios o estimulos de compra."
  },
  {
    "id": 47,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (47).",
    "options": {
      "A": "so",
      "B": "such",
      "C": "enough"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La estructura correcta es \"such cheap clothes that...\". \"Such\" acompana un sintagma nominal con adjetivo; \"so\" iria con adjetivo/adverbio sin nombre."
  },
  {
    "id": 48,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (48).",
    "options": {
      "A": "in",
      "B": "on",
      "C": "around"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "Con el verbo \"spend\" para dinero se usa \"spend money on something\". Por eso corresponde \"on new clothes\"."
  },
  {
    "id": 49,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (49).",
    "options": {
      "A": "hides",
      "B": "represses",
      "C": "extinguishes"
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "La frase indica que la cifra oculta dos tendencias mas preocupantes. \"Hides\" encaja semanticamente; las otras opciones no expresan esa idea."
  },
  {
    "id": 50,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (50).",
    "options": {
      "A": "so",
      "B": "but",
      "C": "although"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La estructura es \"not only..., but...\" para anadir una segunda idea. Aqui contrasta y suma que usan dinero que no tienen para comprar cosas innecesarias."
  },
  {
    "id": 51,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (51).",
    "options": {
      "A": "because of",
      "B": "due to",
      "C": "since"
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La oracion necesita una conjuncion causal seguida de sujeto y verbo: \"since they donate\". \"Because of\" y \"due to\" requieren un sustantivo o frase nominal."
  },
  {
    "id": 52,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (52).",
    "options": {
      "A": "end up",
      "B": "turn out",
      "C": "result in"
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "La expresion correcta es \"end up being thrown away\", que significa terminar siendo desechadas. Las otras no forman esa estructura."
  },
  {
    "id": 53,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (53).",
    "options": {
      "A": "consuming",
      "B": "consumption",
      "C": "consumerism"
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "El movimiento se opone al fenomeno social de consumir en exceso: \"consumerism\". \"Consuming\" es gerundio y \"consumption\" no nombra la ideologia o tendencia."
  },
  {
    "id": 54,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (54).",
    "options": {
      "A": "denial",
      "B": "rejection",
      "C": "contradiction"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "El dia surge como rechazo al gasto excesivo de Black Friday y Cyber Monday. \"Rejection\" expresa oposicion directa."
  },
  {
    "id": 55,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (55).",
    "options": {
      "A": "cut in",
      "B": "cut up",
      "C": "cut off"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La colocacion es \"cut up their credit cards\", es decir, cortarlas en pedazos como protesta. \"Cut off\" y \"cut in\" tienen otros usos."
  },
  {
    "id": 56,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (56).",
    "options": {
      "A": "reaches",
      "B": "reached",
      "C": "has reached"
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "El texto habla de una tendencia que hasta ahora ha alcanzado a influencers. \"Has reached\" conecta pasado y presente."
  },
  {
    "id": 57,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (57).",
    "options": {
      "A": "encourage",
      "B": "compel",
      "C": "drive"
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "La idea es que algunas estrellas de YouTube animan a sus seguidores a no comprar. \"Encourage\" encaja con persuadir de manera positiva."
  },
  {
    "id": 58,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (58).",
    "options": {
      "A": "had saved",
      "B": "have saved",
      "C": "have been saving"
    },
    "answer": "A",
    "source": "Official exam bank",
    "explanation": "La accion de ahorrar ocurrio antes del cierre del periodo narrado \"In one year\". \"Had saved\" funciona como resultado anterior en ese relato."
  },
  {
    "id": 59,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (59).",
    "options": {
      "A": "will",
      "B": "shall",
      "C": "would"
    },
    "answer": "C",
    "source": "Official exam bank",
    "explanation": "La oracion es hipotetica: \"If everyone followed..., the results would be impressive\". Con pasado hipotetico se usa \"would\"."
  },
  {
    "id": 60,
    "module": "cloze",
    "topic": "Cloze: grammar, vocabulary and cohesion",
    "stimulus": "The Buy Nothing movement\n\nSocial media, magazines, and shop windows (46) _________ people daily with things to buy, and British consumers are buying more clothes and shoes than ever before. Online shopping means it is easy for customers to buy without thinking, while major brands offer (47) _________ cheap clothes that they can be treated like disposable items - worn two or three times and then thrown away.\n\nIn Britain, the average person spends more than GBP1,000 (48) _________ new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure (49) _________ two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately GBP670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, (50) _________ they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites.\n\nPeople might not realize they are part of the disposable clothing problem (51) _________ they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities (52) _________ being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems.\n\nHowever, a different trend is springing up in opposition to (53) _________ - the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a (54) _________ of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organize various types of protests and (55) _________ their credit cards. Throughout the year, Buy Nothing groups organize the exchange and repair of items they already own.\n\nThe trend (56) _________ influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now (57) _________ their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they (58) _________ $55,000.\n\nThe changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results (59) _________ be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer (60) _________ to accept the environmental and human cost of overconsumption.",
    "prompt": "Choose the best alternative to fill blank (60).",
    "options": {
      "A": "unsure",
      "B": "willing",
      "C": "reluctant"
    },
    "answer": "B",
    "source": "Official exam bank",
    "explanation": "La expresion natural es \"willing to accept\". El mensaje es que las personas ya no estan dispuestas a aceptar el costo humano y ambiental del sobreconsumo."
  }
];

const normalizeQuestionSource = (question) => ({
  ...question,
  source: 'Official exam bank'
});

export const examQuestions = [
  ...primaryExamQuestions.map(normalizeQuestionSource),
  ...supplementalExamQuestions.map(normalizeQuestionSource),
  ...historicalExamQuestions.map(normalizeQuestionSource)
];

export const answerKey = examQuestions.reduce((acc, question) => {
  acc[question.id] = question.answer;
  return acc;
}, {});
