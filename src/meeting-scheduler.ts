type TimeSlot = {
  day: number;
  start: string;
  end: string;
};

export const parseInputData = (input: string[]): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];

  for (let i = 1; i < input.length; i++) {
    const [day, timeRange] = input[i].split(" ");

    // Parse day and time range
    const [start, end] = timeRange.split("-");

    const timeSlot: TimeSlot = {
      day: parseInt(day),
      start,
      end,
    };

    timeSlots.push(timeSlot);
  }

  return timeSlots;
};
