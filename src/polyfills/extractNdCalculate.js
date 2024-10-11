export let company = {
  sales: [
    { firstName: 'John', lastName: 'Yadav', salary: 1000 },
    { firstName: 'Alice', lastName: 'Jenkins', salary: 1600 },
  ],
  development: {
    sites: [
      { firstName: 'Peter', lastName: 'Kumar', salary: 2000 },
      { firstName: 'Alex', lastName: 'Alexa', salary: 1800 },
    ],
    internals: [{ firstName: 'Jack', lastName: 'Sharma', salary: 1300 }],
  },
  punnu: 12,
  humanResources: {
    HR: {
      helpdesk: [
        { firstName: 'Gill', lastName: 'Gamesh', salary: 4300 },
        { firstName: 'Jill', lastName: 'Mishra', salary: 1900 },
      ],
      recruiter: [
        { firstName: 'Ramesh', lastName: 'Morrison', salary: 900 },
        { firstName: 'Narayan', lastName: 'Maxwell', salary: 1100 },
      ],
    },
  },
};

/**
 * Pseudocode:
 * 1. loop through the properties of the given object.
 * 2. If the property's value is of type array, sum up the salaries and get the result.
 * 3. If the property's value is of type Object, recurse
 * 4. Return the final summed up result.
 */

export function calculateTotalSalary(obj) {
  let sum = 0;
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      sum += obj[key].reduce((a, c) => a + c.salary, 0);
    } else {
      sum += calculateTotalSalary(obj[key]);
    }
  }
  return sum;
}

export function displayFullName(obj) {
  let result = [];
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((el) => result.push(`${el.firstName} ${el.lastName}`));
    } else if (typeof obj[key] === 'object') {
      result = result.concat(displayFullName(obj[key]));
    }
  }
  return result;
}
