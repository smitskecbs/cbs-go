// src/data/nodes.js
export const nodes = [
  {
    id: 'node-1',
    name: 'Old Clock Tower',
    type: 'puzzle',
    description: 'A strange mechanism hides a code.',
    xp: 50,

    // ✅ real world location (example)
    lat: 51.6872,
    lng: 4.8571,

    // ✅ puzzle
    question: 'What is the secret word carved into the stone?',
    hint: 'Look at the oldest inscription.',
    answers: ['sovereign', 'cbs']
  },
  {
    id: 'node-2',
    name: 'Abandoned Square',
    type: 'group',
    requiredPlayers: 5,
    description: 'Requires multiple Sovereigns to unlock.',
    xp: 150,

    // ✅ real world location (example)
    lat: 51.6866,
    lng: 4.8559,

    question: 'Type: UNITY',
    hint: 'All caps.',
    answers: ['unity']
  }
];
