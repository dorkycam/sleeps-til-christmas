// Test edge cases for countdown logic
const dayjs = require('dayjs');

// Mock holiday data for edge case testing
const holidays = {
  tomorrow: {
    slug: 'tomorrow',
    month: dayjs().add(1, 'day').month() + 1, // Tomorrow
    day: dayjs().add(1, 'day').date(),
    message: 'Happy Tomorrow!',
    name: 'Tomorrow',
    theme: 'christmas',
    iconName: 'home',
  },
  today: {
    slug: 'today',
    month: dayjs().month() + 1, // Today
    day: dayjs().date(),
    message: 'Happy Today!',
    name: 'Today',
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

// Test edge cases
console.log('Testing Edge Cases:');
console.log('==================');

Object.values(holidays).forEach(holiday => {
  const number = getCountdownNumber(holiday);
  const label = getCountdownLabel(holiday);
  const { isToday } = calculateHolidayCountdown(holiday);

  console.log(`${holiday.name}:`);
  console.log(`  Number: ${number}`);
  console.log(`  Label: ${label}`);
  console.log(`  Full display: ${isToday ? '🎉' : number} ${label}`);
  console.log(`  Is today: ${isToday}`);
  console.log(`  Message: ${isToday ? holiday.message : 'N/A'}`);
  console.log('');
});

// Test pluralization specifically
console.log('Pluralization Test:');
console.log('==================');
[0, 1, 2, 5].forEach(sleeps => {
  const label =
    sleeps === 0
      ? 'Happy Holiday!'
      : sleeps === 1
        ? `sleep 'til Holiday`
        : `sleeps 'til Holiday`;
  console.log(`${sleeps}: ${sleeps === 0 ? '🎉' : sleeps} ${label}`);
});
