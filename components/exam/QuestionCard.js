import { Alert, Badge, Card } from 'react-bootstrap';

const optionLetters = ['A', 'B', 'C'];
const broadListBreakPattern = /\s-\s+/g;
const processBreakPattern = / - (?=(?:First,|Next,|Then\b|After that,|Finally,|While\b|During\b|Once\b|The teacher\b|The students\b|After the students\b|As a first\b|Ask\b|Give\b|Have\b|When\b))/g;
const finalQuestionPattern = /\s((?:Which|What|Why|How|Given|Based on|According to|In this context|Considering|Taking into account)[^?]+\?)$/;

const listConfigs = [
  {
    pattern: /(?:following teaching sequence|following sequence|sequence he has designed|planned the following|following activities|process writing approach|carries out the following sequence)/i,
    title: 'Proceso de clase',
    ordered: true,
    breakPattern: processBreakPattern
  },
  {
    pattern: /following expressions/i,
    title: 'Expresiones clave',
    ordered: false,
    splitAll: true
  },
  {
    pattern: /following questions/i,
    title: 'Preguntas guia',
    ordered: false,
    splitAll: true
  }
];

const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();

const stripExamInstruction = (text) => {
  const instruction = text.match(/^Read the following situation and answer questions? ([^.]+)\.\s*/i);

  if (!instruction) {
    return { note: '', text };
  }

  return {
    note: `Preguntas ${instruction[1].replace(/\band\b/i, 'y')}`,
    text: text.slice(instruction[0].length).trim()
  };
};

const splitIntoParagraphs = (text) => {
  const blocks = text.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);

  if (blocks.length > 1) {
    return blocks;
  }

  const sentences = text
    .split(/(?<=[.!?])\s+(?=[A-Z"'])/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (sentences.length <= 3) {
    return [text.trim()];
  }

  const paragraphs = [];
  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join(' '));
  }

  return paragraphs;
};

const getListConfig = (intro) => listConfigs.find((config) => config.pattern.test(intro));

const splitListItems = (text, config) => {
  const pattern = config.splitAll ? broadListBreakPattern : config.breakPattern;
  const items = text
    .split(pattern)
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length > 1) {
    return items;
  }

  return text
    .split(broadListBreakPattern)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseDialogue = (text) => {
  const dialogueMatch = text.match(/^(.*?following dialogue:)\s*(.+)$/i);

  if (!dialogueMatch) {
    return null;
  }

  const turns = dialogueMatch[2]
    .split(/(?=\b[A-Z][a-z]+ says:)/)
    .map((turn) => turn.trim())
    .filter(Boolean);

  if (turns.length < 2) {
    return null;
  }

  return {
    intro: splitIntoParagraphs(dialogueMatch[1]),
    listTitle: 'Dialogo',
    listItems: turns,
    ordered: false,
    listStyle: 'dialogue'
  };
};

const parseLearningText = (text) => {
  const cleanText = normalizeText(text);
  const { note, text: readableText } = stripExamInstruction(cleanText);
  const dialogue = parseDialogue(readableText);

  if (dialogue) {
    return { note, ...dialogue };
  }

  const firstListMarker = readableText.indexOf(' - ');

  if (firstListMarker > -1) {
    const intro = readableText.slice(0, firstListMarker).trim();
    const listConfig = getListConfig(intro);

    if (listConfig) {
      const listText = readableText.slice(firstListMarker + 3).trim();

      return {
        note,
        intro: splitIntoParagraphs(intro),
        listTitle: listConfig.title,
        listItems: splitListItems(listText, listConfig),
        ordered: listConfig.ordered,
        listStyle: 'standard'
      };
    }
  }

  return {
    note,
    intro: splitIntoParagraphs(readableText),
    listTitle: '',
    listItems: [],
    ordered: false,
    listStyle: 'standard'
  };
};

const splitPrompt = (prompt) => {
  const cleanPrompt = normalizeText(prompt);

  if (cleanPrompt.length < 220) {
    return { context: '', questionText: cleanPrompt };
  }

  const finalQuestion = cleanPrompt.match(finalQuestionPattern);

  if (!finalQuestion) {
    return { context: '', questionText: cleanPrompt };
  }

  const context = cleanPrompt.slice(0, finalQuestion.index).trim();

  if (context.length < 100) {
    return {
      context: '',
      questionText: cleanPrompt
    };
  }

  return {
    context,
    questionText: finalQuestion[1].trim()
  };
};

const LearningTextBlock = ({ text, label = 'Contexto del caso', compact = false }) => {
  const parsedText = parseLearningText(text);
  const ListTag = parsedText.ordered ? 'ol' : 'ul';

  return (
    <div className={`prep-learning-block ${compact ? 'is-compact' : ''} mb-4`}>
      <div className="prep-learning-header">
        <span className="prep-learning-label">{label}</span>
        {parsedText.note ? <span className="prep-learning-note">{parsedText.note}</span> : null}
      </div>

      <div className="prep-learning-body">
        {parsedText.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {parsedText.listItems.length ? (
        <div className="prep-learning-list-wrap">
          <div className="prep-learning-list-title">{parsedText.listTitle}</div>
          <ListTag className={`prep-learning-list is-${parsedText.listStyle}`}>
            {parsedText.listItems.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ListTag>
        </div>
      ) : null}
    </div>
  );
};

const QuestionCard = ({
  question,
  selectedAnswer,
  onSelect,
  showFeedback = false,
  disabled = false
}) => {
  const isAnswered = Boolean(selectedAnswer);
  const isCorrect = selectedAnswer === question.answer;
  const showExplanation = showFeedback && (isAnswered || disabled);
  const feedbackVariant = !isAnswered ? 'info' : isCorrect ? 'success' : 'danger';
  const promptParts = splitPrompt(question.prompt);

  return (
    <Card className="prep-question-card">
      <Card.Body>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <Badge bg="primary" className="rounded-pill">Pregunta {question.id}</Badge>
          <Badge bg="light" text="dark" className="rounded-pill">{question.topic}</Badge>
        </div>

        {question.stimulus ? (
          <LearningTextBlock text={question.stimulus} />
        ) : null}

        {promptParts.context ? (
          <LearningTextBlock text={promptParts.context} label="Detalle del enunciado" compact />
        ) : null}

        <div className="prep-question-focus mb-4">
          <div className="prep-question-focus-label">Pregunta</div>
          <h4 className="prep-question-title mb-0">{promptParts.questionText}</h4>
        </div>

        <div className="prep-option-list">
          {optionLetters.map((letter) => {
            const isSelected = selectedAnswer === letter;
            const revealCorrect = showFeedback && question.answer === letter;
            const revealWrong = showFeedback && isSelected && !revealCorrect;

            return (
              <button
                type="button"
                key={letter}
                className={[
                  'prep-option',
                  isSelected ? 'is-selected' : '',
                  revealCorrect ? 'is-correct' : '',
                  revealWrong ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                aria-pressed={isSelected}
                disabled={disabled}
                onClick={() => onSelect?.(letter)}
              >
                <span className="prep-option-letter">{letter}</span>
                <span className="prep-option-text">{question.options[letter]}</span>
              </button>
            );
          })}
        </div>

        {showExplanation ? (
          <Alert variant={feedbackVariant} className="mb-0 mt-4 prep-feedback">
            <div className="fw-semibold">
              {!isAnswered ? `Sin respuesta. Clave correcta: ${question.answer}` : isCorrect ? 'Correcto' : `Clave correcta: ${question.answer}`}
            </div>
            <div className="small mb-0">
              {isAnswered && isCorrect ? 'Tu eleccion coincide con la clave oficial.' : null}
              {isAnswered && !isCorrect ? `Tu respuesta fue ${selectedAnswer}. Revisa por que la clave oficial apunta a otra alternativa.` : null}
              {!isAnswered ? 'Esta pregunta quedo pendiente en tu intento.' : null}
            </div>
            {question.explanation ? (
              <div className="prep-explanation mt-3">
                <span>Por que:</span> {question.explanation}
              </div>
            ) : null}
          </Alert>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
