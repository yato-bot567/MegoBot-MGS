// Define a variable to store the anti-212 mode
let anti212Mode = false;

// Define a function to toggle anti-212 mode
function toggleAnti212Mode(message) {
  if (message.body === 'anti212') {
    anti212Mode =!anti212Mode;
    if (anti212Mode) {
      console.log('Anti-212 mode enabled');
    } else {
      console.log('Anti-212 mode disabled');
    }
  }
}

// Define a function to filter out commands from numbers starting with 212
function filterCommands(message) {
  if (anti212Mode) {
    const phoneNumber = message.from;
    const countryCode = phoneNumber.substring(0, 3);
    if (countryCode === '212') {
      return false; // Ignore commands from numbers starting with 212
    }
  }
  return true; // Allow commands from other numbers
}

// Example usage:
const message1 = {
  from: '+1234567890',
  body: 'hello'
};

const message2 = {
  from: '+212123456789',
  body: 'hello'
};

const message3 = {
  from: '+1234567890',
  body: 'anti212'
};

toggleAnti212Mode(message3); // Enable anti-212 mode

if (filterCommands(message1)) {
  console.log('Command allowed from', message1.from);
} else {
  console.log('Command ignored from', message1.from);
}

if (filterCommands(message2)) {
  console.log('Command allowed from', message2.from);
} else {
  console.log('Command ignored from', message2.from);
}
