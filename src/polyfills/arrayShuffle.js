// Fisher-Yates Shuffle

export function shuffleArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randIdx = Math.floor(Math.random() * (i + 1));
    // swap
    [arr[randIdx], arr[i]] = [arr[i], arr[randIdx]];
  }
}
