import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'Q01',
    text: 'What is your date of birth?',
    type: 'text',
    required: true,
    hint: 'We use this to ensure age-appropriate support and routing.',
  },
  {
    id: 'Q02',
    text: 'What is your biological sex?',
    type: 'multiple_choice',
    required: true,
    options: ['Male', 'Female', 'Intersex', 'Prefer not to say'],
  },
  {
    id: 'Q03',
    text: 'Which county in Ireland do you live in?',
    type: 'multiple_choice',
    required: true,
    options: [
      'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin',
      'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim',
      'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan',
      'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Waterford',
      'Westmeath', 'Wexford', 'Wicklow', 'Antrim', 'Armagh',
      'Down', 'Fermanagh', 'Derry', 'Tyrone', 'Outside Ireland',
    ],
  },
  {
    id: 'Q04',
    text: 'Are you currently involved in regular sport or physical exercise?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q05',
    text: 'If yes, how many hours per week do you exercise on average?',
    type: 'multiple_choice',
    required: false,
    showIf: { questionId: 'Q04', answer: true },
    options: ['Less than 1 hour', '1–3 hours', '3–5 hours', '5–10 hours', 'More than 10 hours'],
  },
  {
    id: 'Q06',
    text: 'Do you ever feel your heart racing or fluttering unexpectedly?',
    type: 'yes_no',
    required: true,
    hint: 'This is called palpitations. It can feel like a skipped beat, a flutter, or a pounding sensation.',
  },
  {
    id: 'Q07',
    text: 'Have you ever felt dizzy or light-headed during or after exercise?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q08',
    text: 'Have you ever had to stop exercising suddenly because you felt unwell?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q09',
    text: 'Have you ever felt unusually short of breath during normal everyday activity (not just exercise)?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q10',
    text: 'Have you ever been told your blood pressure is unusually high or low?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q11',
    text: 'Have you ever fainted or completely lost consciousness during or shortly after exercise?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
    hint: 'Fainting during exercise is a serious warning sign and should always be investigated by a doctor.',
  },
  {
    id: 'Q12',
    text: 'Have you ever had a seizure or convulsion that had no known cause (e.g. not related to epilepsy)?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
  },
  {
    id: 'Q13',
    text: 'Have you ever had chest pain, tightness, or pressure during or after exercise?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
  },
  {
    id: 'Q14',
    text: 'Have you ever been told you have a heart murmur?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q15',
    text: 'Has anyone in your immediate family (parent, sibling, grandparent) died suddenly and unexpectedly before the age of 40?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
    hint: 'Sudden unexplained death in a young family member can indicate an inherited heart condition that others in the family may also carry.',
  },
  {
    id: 'Q16',
    text: 'Has anyone in your immediate family been diagnosed with a heart condition before the age of 50?',
    type: 'yes_no',
    required: true,
    hint: 'Examples include long QT syndrome, Brugada syndrome, cardiomyopathy, or hypertrophic cardiomyopathy.',
  },
  {
    id: 'Q17',
    text: 'Have you ever been told by a doctor that you have an irregular heartbeat or a heart rhythm problem?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
  },
  {
    id: 'Q18',
    text: 'Have you ever been diagnosed with any of the following: Long QT syndrome, Brugada syndrome, Wolff-Parkinson-White, cardiomyopathy, or Marfan syndrome?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
  },
  {
    id: 'Q19',
    text: 'Do you currently take any medication prescribed for a heart condition or heart rhythm?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
  },
  {
    id: 'Q20',
    text: 'Do you use any recreational drugs? (Your answer is confidential and will not be shared with anyone outside of this research.)',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q21',
    text: 'Do you smoke cigarettes or use any other nicotine products (including vapes)?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q22',
    text: 'Do you regularly consume energy drinks (more than 3 per week)?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q23',
    text: 'Has a GP, nurse, or other health professional ever expressed concern about your heart or told you to avoid strenuous exercise?',
    type: 'yes_no',
    required: true,
    flagOnAnswer: true,
  },
  {
    id: 'Q24',
    text: 'Have you ever had a cardiac (heart) scan or echocardiogram?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'Q25',
    text: 'Have you ever had an ECG (heart tracing / electrocardiogram)?',
    type: 'yes_no',
    required: true,
    hint: 'An ECG records the electrical activity of your heart. It is a simple, painless test.',
  },
];

export const HIGH_RISK_FLAG_IDS = new Set([
  'Q11', 'Q12', 'Q13', 'Q15', 'Q17', 'Q18', 'Q19', 'Q23',
]);

export const MODERATE_CONCERN_IDS = new Set([
  'Q06', 'Q07', 'Q08', 'Q09', 'Q14', 'Q16',
]);

export function getVisibleQuestions(answers: Record<string, unknown>): Question[] {
  return QUESTIONS.filter((q) => {
    if (!q.showIf) return true;
    return answers[q.showIf.questionId] === q.showIf.answer;
  });
}
