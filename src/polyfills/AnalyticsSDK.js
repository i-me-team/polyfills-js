/**
 * Problem link: https://learnersbucket.com/examples/interview/create-analytics-sdk-in-javascript/
 */

class SDK {
  constructor() {
    this.q = [];
    this.eventCt = 0;
  }

  logEvent(event) {
    this.q.push(event);
  }

  async send() {
    // for (let event of this.q) {
    //   await this.#sendHelper(event);
    // }
    // // Clear the events from the queue
    // this.q.length = 0;
    while (this.q.length > 0) {
      const event = this.q.shift();
      await this.#sendHelper(event);
    }
  }

  async #sendHelper(event) {
    // 1 second delay(sleep)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (++this.eventCt % 5 === 0) {
      // fail and retry
      console.error(
        `-----------------------\nFailed to send ${event}\nRetrying sending ${event}\n-----------------------`,
      );
      await this.#sendHelper(event);
    } else {
      // succeed
      console.log(`Analytics sent ${event}`);
    }
  }
}

const sdk = new SDK();

sdk.logEvent('event 1');
sdk.logEvent('event 2');
sdk.logEvent('event 3');
sdk.logEvent('event 4');
sdk.logEvent('event 5');
sdk.logEvent('event 6');
sdk.logEvent('event 7');
sdk.logEvent('event 8');
sdk.logEvent('event 9');
sdk.logEvent('event 10');

sdk.send();
