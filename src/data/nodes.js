// src/data/nodes.js
export const nodes = [
  {
    id: 'stop-1',
    legacyId: 'node-1',
    name: 'Old Clock Tower',
    type: 'puzzle',
    description: 'A strange mechanism hides a code.',
    xp: 50,
    question: 'Type: cbs',
    hint: 'Lowercase.',
    answers: ['cbs']
  },
  {
    id: 'stop-2',
    legacyId: 'node-2',
    name: 'Abandoned Square',
    type: 'group',
    requiredPlayers: 5,
    description: 'Requires multiple Sovereigns to unlock.',
    xp: 150,
    question: 'Type: unity',
    hint: 'Lowercase.',
    answers: ['unity']
  },
  {
    id: 'stop-3',
    legacyId: 'node-3',
    name: 'River Marker',
    type: 'puzzle',
    description: 'The water reflects the truth.',
    xp: 80,
    question: 'Type: sovereign',
    hint: 'Lowercase.',
    answers: ['sovereign']
  }
];
