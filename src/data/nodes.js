// src/data/nodes.js
// Nodes shown on the map. Each node can contain a "puzzle" object.
// puzzle types supported by puzzleModal.js:
// - mcq: { type:'mcq', q:'', options:[...], answerIndex:0, explain:'' }
// - input: { type:'input', q:'', answers:['a','b'], explain:'' }  (case-insensitive, trimmed)
// - code: { type:'code', q:'', code:'CBS', hint:'', explain:'' }   (exact after normalize)

export const nodes = [
  {
    id: 'node-1',
    type: 'puzzle',
    name: 'Signal vs Noise',
    description: 'Logic puzzle (2 min).',
    xp: 60,
    puzzle: {
      type: 'mcq',
      q: 'A scammer always lies. A builder always tells the truth.\n\nYou meet two people. One says: “We are both scammers.”\nWhat are they?',
      options: [
        'Both scammers',
        'Both builders',
        'One scammer + one builder',
        'Impossible to know'
      ],
      answerIndex: 2,
      explain:
        'If the speaker was a scammer, “we are both scammers” would be false → meaning at least one is a builder, consistent. If the speaker was a builder, it would mean both are scammers, impossible. So: one scammer + one builder.'
    }
  },

  {
    id: 'node-2',
    type: 'puzzle',
    name: 'Riddle: The Key',
    description: 'Short riddle (1 min).',
    xp: 40,
    puzzle: {
      type: 'input',
      q: 'I have keys but no locks.\nI have space but no rooms.\nYou can enter, but you can’t go outside.\nWhat am I?',
      answers: ['keyboard', 'a keyboard'],
      explain: 'A keyboard has keys, a space bar, and an enter key.'
    }
  },

  {
    id: 'node-3',
    type: 'puzzle',
    name: 'Mini Cipher',
    description: 'Decode it (2–3 min).',
    xp: 80,
    puzzle: {
      type: 'code',
      q: 'Decode this Caesar shift (+1):\n\nDBT\n\n(Each letter is shifted +1 from the original.)',
      hint: 'Try shifting letters back by 1.',
      code: 'CAS',
      explain: 'DBT shifted back by 1 → CAS.'
    }
  },

  {
    id: 'node-4',
    type: 'puzzle',
    name: 'Steps Math',
    description: 'Quick math check.',
    xp: 50,
    puzzle: {
      type: 'input',
      q: 'If you walk 2 km and your step length is 0.8 m, about how many steps is that? (Round to whole number)',
      answers: ['2500'],
      explain: '2000m / 0.8m ≈ 2500 steps.'
    }
  },

  {
    id: 'node-5',
    type: 'puzzle',
    name: 'CBS Motto',
    description: 'Community memory.',
    xp: 30,
    puzzle: {
      type: 'code',
      q: 'Type the CBS motto (3 words):',
      hint: 'C _ _ _ _ _ _ _  B _ _ _ _ _  S _ _ _ _ _ _ _ _ _',
      code: 'COMMUNITY BUILDS SOVEREIGNTY',
      explain: 'CBS = Community Builds Sovereignty.'
    }
  }

  // Later: add group nodes / beacon nodes here (type:'group' etc.)
];
