/*
 * Reflect forwarding inside Proxy traps
 *
 * A proxy trap lets us run custom logic.
 * A matching Reflect method lets us continue with JavaScript's normal behavior.
 *
 * Mental model:
 *
 * operation -> proxy trap -> custom work -> Reflect.method(...) -> target
 */

const profileTarget = {
  name: 'Asha',
  topic: 'Proxy',
};

/*
 * Example 1:
 * Use Reflect.get() after custom read logic.
 */
const readLog = [];

const profile = new Proxy(profileTarget, {
  get(target, property, receiver) {
    readLog.push(String(property));

    return Reflect.get(target, property, receiver);
  },
});

console.log('1. Forwarded get result:', profile.name);
// Expected output: Asha

console.log('2. Read log:', readLog);
// Expected output: [ 'name' ]

/*
 * Example 2:
 * Use Reflect.set() after validation.
 *
 * set traps should return a boolean:
 * - true means the write succeeded,
 * - false means the write failed.
 *
 * Reflect.set() performs the normal assignment and returns that boolean.
 */
const progressTarget = {
  score: 10,
};

const progress = new Proxy(progressTarget, {
  set(target, property, value, receiver) {
    if (property === 'score' && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError('score must be a non-negative integer');
    }

    return Reflect.set(target, property, value, receiver);
  },
});

progress.score = 25;

console.log('3. Forwarded set updated target:', progressTarget.score);
// Expected output: 25

/*
 * Example 3:
 * Use Reflect.has() to keep the normal "in" behavior after custom logic.
 */
const settingsTarget = {
  theme: 'dark',
  language: 'en',
};

const settings = new Proxy(settingsTarget, {
  has(target, property) {
    console.log(`4. Checking key: ${String(property)}`);

    return Reflect.has(target, property);
  },
});

console.log('5. theme exists:', 'theme' in settings);
// Expected output:
// 4. Checking key: theme
// 5. theme exists: true

/*
 * Example 4:
 * Use Reflect.deleteProperty() after custom delete logic.
 */
const sessionTarget = {
  id: 'session-1',
  token: 'secret',
};

const session = new Proxy(sessionTarget, {
  deleteProperty(target, property) {
    if (property === 'token') {
      return false;
    }

    return Reflect.deleteProperty(target, property);
  },
});

console.log('6. Delete normal key:', delete session.id);
// Expected output: true

console.log('7. id still exists:', Reflect.has(sessionTarget, 'id'));
// Expected output: false

console.log('8. Delete protected key:', delete session.token);
// Expected output: false

console.log('9. token still exists:', Reflect.has(sessionTarget, 'token'));
// Expected output: true

/*
 * Example 5:
 * Trap arguments often match the matching Reflect method arguments.
 *
 * In a normal trap method, arguments contains:
 * get(target, property, receiver)
 *
 * So Reflect.get(...arguments) forwards all of them.
 */
const shortcutTarget = {
  title: 'Forwarding shortcut',
};

const shortcutProxy = new Proxy(shortcutTarget, {
  get(target, property, receiver) {
    console.log('10. Shortcut get key:', property);

    return Reflect.get(...arguments);
  },
});

console.log('11. Shortcut forwarded value:', shortcutProxy.title);
// Expected output:
// 10. Shortcut get key: title
// 11. Shortcut forwarded value: Forwarding shortcut

/*
 * Example 6:
 * Forward to the target, not to the same proxy.
 *
 * Calling Reflect.get(proxy, property, receiver) from the proxy's own get trap
 * would trigger the same get trap again.
 *
 * This artificial example stops after a few reads so the file can run safely.
 */
let recursiveReads = 0;
let recursiveProxy;

recursiveProxy = new Proxy(
  {
    title: 'Avoid recursion',
  },
  {
    get(target, property, receiver) {
      recursiveReads++;

      if (recursiveReads > 3) {
        return 'stopped before infinite recursion';
      }

      return Reflect.get(recursiveProxy, property, receiver);
    },
  },
);

console.log('12. Wrong forwarding result:', recursiveProxy.title);
// Expected output: stopped before infinite recursion

console.log('13. Wrong forwarding read count:', recursiveReads);
// Expected output: 4

/*
 * Correct forwarding uses the target received by the trap.
 */
let correctReads = 0;

const correctProxy = new Proxy(
  {
    title: 'Correct forwarding',
  },
  {
    get(target, property, receiver) {
      correctReads++;

      return Reflect.get(target, property, receiver);
    },
  },
);

console.log('14. Correct forwarding result:', correctProxy.title);
// Expected output: Correct forwarding

console.log('15. Correct forwarding read count:', correctReads);
// Expected output: 1
