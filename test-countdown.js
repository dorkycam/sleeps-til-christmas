// Simple test to verify countdown logic
const dayjs = require('dayjs');

// Mock holiday data
const holidays = {
  christmas: {
    slug: 'christmas',
    month: 12,
    day: 25,
    message: 'Merry Christmas!',
    name: 'Christmas',
    theme: 'christmas',
    iconName: 'home',
  },
  halloween: {
    slug: 'halloween',
    month: 10,
    day: 31,
    message: 'Happy Halloween!',
    name: 'Halloween',
    theme: 'halloween',
    iconName: 'smile',
  },
};

// Mock countdown functions
function calculateHolidayCountdown(holiday) {
  const today = dayjs().startOf('day');
  const currentYear = today.year();

  let targetDate = dayjs()
    .year(currentYear)
    .month(holiday.month - 1)
    .date(holiday.day)
    .startOf('day');

  const isToday = targetDate.isSame(today, 'day');

  if (targetDate.isBefore(today, 'day')) {
    targetDate = targetDate.add(1, 'year');
  }

  const sleepsUntil = isToday ? 0 : targetDate.diff(today, 'day');

  return {
    sleepsUntil: Math.max(0, sleepsUntil),
    isToday,
    targetDate,
  };
}

function getCountdownNumber(holiday) {
  return calculateHolidayCountdown(holiday).sleepsUntil;
}

function getCountdownLabel(holiday) {
  const { sleepsUntil, isToday } = calculateHolidayCountdown(holiday);

  if (isToday) {
    return `Happy ${holiday.name}!`;
  } else if (sleepsUntil === 1) {
    return `sleep 'til ${holiday.name}`;
  } else {
    return `sleeps 'til ${holiday.name}`;
  }
}

// Test both holidays
console.log('Testing Countdown Logic:');
console.log('========================');

Object.values(holidays).forEach(holiday => {
  const number = getCountdownNumber(holiday);
  const label = getCountdownLabel(holiday);
  const { isToday } = calculateHolidayCountdown(holiday);

  console.log(`${holiday.name}:`);
  console.log(`  Number: ${number}`);
  console.log(`  Label: ${label}`);
  console.log(`  Full text: ${number} ${label}`);
  console.log(`  Is today: ${isToday}`);
  console.log(`  Message: ${isToday ? holiday.message : 'N/A'}`);
  console.log('');
});
