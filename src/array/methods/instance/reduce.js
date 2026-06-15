// https://www.notion.so/Map-and-Reduce-308cd9fa9dd34e5fb809cce04481175d

const server = {
  channels: [
    { id: 1, type: 'TEXT', name: 'general' },
    { id: 2, type: 'TEXT', name: 'random' },
    { id: 3, type: 'AUDIO', name: 'music' },
    { id: 4, type: 'VIDEO', name: 'conference' },
  ],
  members: [
    { profileId: 1, name: 'Alice' },
    { profileId: 2, name: 'Bob' },
    { profileId: 3, name: 'Charlie' },
  ],
};

const profile = { id: 1, name: 'Alice' };

const { textChannels, audioChannels, videoChannels, members } =
  server?.channels.reduce(
    (acc, channel) => {
      switch (channel.type) {
        case 'TEXT':
          acc.textChannels.push(channel);
          break;
        case 'AUDIO':
          acc.audioChannels.push(channel);
          break;
        case 'VIDEO':
          acc.videoChannels.push(channel);
          break;
      }
      return acc;
    },
    {
      textChannels: [],
      audioChannels: [],
      videoChannels: [],
      members: server?.members.filter(
        (member) => member.profileId !== profile.id
      ),
    }
  );

console.log(textChannels);

console.log(members);

const acc = server.channels.reduce(
  (acc, channel) => {
    if (channel.type === 'TEXT') {
      acc.textChannels.push(channel);
    }
    return acc;
  },
  { textChannels: [] }
);

console.log(acc);

// ---------------------------------------------------------------------------------

const cache = {};

let prevValue;
const something = (value) => {
  // check whether the value has changed
  // if it has, create a new function
  if (!cache.current || value !== prevValue) {
    cache.current = () => {
      console.log(value);
    };
  }
  // refresh it
  prevValue = value;
  return cache.current;
};

const first = something('first');
const anotherFirst = something('first');
const second = something('second');
first(); // logs "first"
second(); // logs "second"
console.log(first === anotherFirst); // will be true
