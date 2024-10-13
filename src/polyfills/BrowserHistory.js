export class BrowserHistory {
  constructor(homepage) {
    this.history = [homepage];
    this.currPageIdx = 0;
  }

  visit(url) {
    this.currPageIdx++;
    this.history = this.history.slice(0, this.currPageIdx);
    this.history.push(url);
  }

  back(steps) {
    this.currPageIdx = Math.max(0, this.currPageIdx - steps);
    return this.history[this.currPageIdx];
  }

  forward(steps) {
    this.currPageIdx = Math.min(
      this.history.length - 1,
      this.currPageIdx + steps,
    );
    return this.history[this.currPageIdx];
  }
}
