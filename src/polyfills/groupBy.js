/**
 * const items = [
  {
    id: 1,
    kind: 'a',
  },
  {
    id: 2,
    kind: 'b',
  },
  {
    id: 3,
    kind: 'a',
  }
]
const groups = Object.groupBy(items, ({kind}) => kind)
 {
   a: [
     {
       id: 1,
       kind: 'a'
     },
     {
       id: 3,
       kind: 'a'
     }
   ],
   b: [
     {
       id: 2,
       kind: 'b'
     }
   ]
 }
 */
export function objectGroupBy(items, callback) {
  return items.reduce((acc, currVal) => {
    const target = callback(currVal);
    if (!(target in acc)) {
      acc[target] = [];
    }
    acc[target].push(currVal);
    return acc;
  }, Object.create(null));
}
