// export const TOPIC_IDS = ['recursion', 'backtracking', 'stack', 'graph'];

// export const PROBLEMS = [
//   {
//     slug: 'generate-binary-strings',
//     route: '/recursion/generate-binary-strings',
//     title: 'Generate Binary Strings',
//     topic: 'recursion',
//     difficulty: 'medium',
//     label: 'Medium',
//     pattern: 'Recursive Decision Tree',
//     access: 'free',
//     status: 'ready',
//     order: 10,
//     estimatedMinutes: 14,
//     isFeaturedFree: true,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 'all',
//       dryRun: true,
//       quiz: false,
//     },
//   },
//   {
//     slug: 'generate-parentheses',
//     route: '/recursion/generate-parentheses',
//     title: 'Generate Parentheses',
//     topic: 'recursion',
//     difficulty: 'medium',
//     label: 'LeetCode 22',
//     pattern: 'Constrained Recursion',
//     access: 'subscriber',
//     status: 'ready',
//     order: 20,
//     estimatedMinutes: 18,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 8,
//       dryRun: false,
//       quiz: false,
//     },
//     leetcode: 22,
//   },
//   {
//     slug: 'check-subsequence-sum-k',
//     route: '/recursion/check-subsequence-sum-k',
//     title: 'Check Subsequence Sum K',
//     topic: 'recursion',
//     difficulty: 'medium',
//     label: 'Medium',
//     pattern: 'Pick/Not Pick + Early Return',
//     access: 'free',
//     status: 'ready',
//     order: 30,
//     estimatedMinutes: 16,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 'all',
//       dryRun: true,
//       quiz: false,
//     },
//   },
//   {
//     slug: 'letter-combinations',
//     route: '/backtracking/letter-combinations',
//     title: 'Letter Combinations of a Phone Number',
//     topic: 'backtracking',
//     difficulty: 'beginner',
//     label: 'LeetCode 17',
//     pattern: 'Beginner Friendly',
//     access: 'free',
//     status: 'ready',
//     order: 10,
//     estimatedMinutes: 15,
//     isFeaturedFree: true,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 'all',
//       dryRun: true,
//       quiz: false,
//     },
//     leetcode: 17,
//   },
//   {
//     slug: 'combination-sum',
//     route: '/backtracking/combination-sum',
//     title: 'Combination Sum',
//     topic: 'backtracking',
//     difficulty: 'medium',
//     label: 'LeetCode 39',
//     pattern: 'Unlimited Reuse Backtracking',
//     access: 'free',
//     status: 'ready',
//     order: 20,
//     estimatedMinutes: 22,
//     isFeaturedFree: true,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 'all',
//       dryRun: true,
//       quiz: false,
//     },
//     leetcode: 39,
//   },
//   {
//     slug: 'combination-sum-iii',
//     route: '/backtracking/combination-sum-iii',
//     title: 'Combination Sum III',
//     topic: 'backtracking',
//     difficulty: 'medium',
//     label: 'LeetCode 216',
//     pattern: 'Complete Visualization',
//     access: 'subscriber',
//     status: 'ready',
//     order: 30,
//     estimatedMinutes: 22,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 10,
//       dryRun: false,
//       quiz: false,
//     },
//     leetcode: 216,
//   },
//   {
//     slug: 'palindrome-partitioning',
//     route: '/backtracking/palindrome-partitioning',
//     title: 'Palindrome Partitioning',
//     topic: 'backtracking',
//     difficulty: 'medium',
//     label: 'LeetCode 131',
//     pattern: 'String Partitioning',
//     access: 'subscriber',
//     status: 'ready',
//     order: 40,
//     estimatedMinutes: 24,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 10,
//       dryRun: false,
//       quiz: false,
//     },
//     leetcode: 131,
//   },
//   {
//     slug: 'word-search',
//     route: '/backtracking/word-search',
//     title: 'Word Search (2D Grid DFS)',
//     topic: 'backtracking',
//     difficulty: 'medium',
//     label: 'LeetCode 79',
//     pattern: '2D Grid + Backtracking',
//     access: 'subscriber',
//     status: 'ready',
//     order: 50,
//     estimatedMinutes: 26,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 12,
//       dryRun: false,
//       quiz: false,
//     },
//     leetcode: 79,
//   },
//   {
//     slug: 'next-greater-element',
//     route: '/stack/next-greater-element',
//     title: 'Next Greater Element',
//     topic: 'stack',
//     difficulty: 'medium',
//     label: 'Linear Array',
//     pattern: 'Monotonic Stack',
//     access: 'free',
//     status: 'ready',
//     order: 10,
//     estimatedMinutes: 18,
//     isFeaturedFree: true,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 'all',
//       dryRun: true,
//       quiz: false,
//     },
//   },
//   {
//     slug: 'next-greater-element-ii',
//     route: '/stack/next-greater-element-ii',
//     title: 'Next Greater Element II',
//     topic: 'stack',
//     difficulty: 'medium',
//     label: 'LeetCode 503',
//     pattern: 'Circular Array + Monotonic Stack',
//     access: 'subscriber',
//     status: 'ready',
//     order: 20,
//     estimatedMinutes: 22,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 10,
//       dryRun: false,
//       quiz: false,
//     },
//     leetcode: 503,
//   },
//   {
//     slug: 'dfs',
//     route: '/graph/dfs',
//     title: 'Depth-First Search (DFS)',
//     topic: 'graph',
//     difficulty: 'algorithm',
//     label: 'Graph Traversal',
//     pattern: 'Recursion with Loops',
//     access: 'free',
//     status: 'ready',
//     order: 10,
//     estimatedMinutes: 16,
//     isFeaturedFree: true,
//     freePreview: {
//       explanation: true,
//       visualizerSteps: 'all',
//       dryRun: true,
//       quiz: false,
//     },
//   },
// ];

// export function getProblemsForTopic(topic) {
//   return PROBLEMS.filter((problem) => problem.topic === topic).sort(
//     (a, b) => a.order - b.order,
//   );
// }

// export const PROBLEMS_BY_TOPIC = TOPIC_IDS.reduce((groups, topic) => {
//   groups[topic] = getProblemsForTopic(topic);
//   return groups;
// }, {});

// console.log('PROBLEMS_BY_TOPIC', PROBLEMS_BY_TOPIC);

function sample() {
  const _map = new Map();

  const obj = {
    7: { val: 7, next: 13, random: 11 },
    13: { val: 13, next: 11, random: null },
    11: { val: 11, next: 10, random: 1 },
    10: { val: 10, next: 1, random: 7 },
    1: { val: 1, next: null, random: 7 },
  };

  for (const key in obj) {
    const newNode = { val: obj[key].val, next: null, random: null };
    _map.set(key, newNode);
  }

  for (const key in obj) {
    const newNode = _map.get(key);

    newNode.next =
      obj[key].next === null ? null : _map.get(String(obj[key].next));

    newNode.random =
      obj[key].random === null ? null : _map.get(String(obj[key].random));

    console.log('newNode -- ', newNode);
  }
}

sample();
