export type TimeSlot = {
  day: number;
  start: string;
  end: string;
};

export const parseInputData = (input: string[]): TimeSlot[] => {
  return input
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [day, timeRange] = line.split(" ");
      const [start, end] = timeRange.split("-");
      return { day: parseInt(day), start, end };
    })
    .sort((a, b) => {
      if (a.day !== b.day) {
        return a.day - b.day;
      }
      return a.start.localeCompare(b.start);
    });
};

// Function to calculate duration between two times
export const calculateDuration = (
  startTime: string,
  endTime: string
): number => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let duration = endHour * 60 + endMinute - (startHour * 60 + startMinute) + 1;

  if (duration < 0) {
    duration += 24 * 60;
  }

  return duration;
};

export const calculateEndTime = (
  startTime: string,
  duration: number
): string | null => {
  // Parse start time into hours and minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);

  // Calculate total minutes from start time
  const endMinutes = startHour * 60 + startMinute + duration;

  const workDayEnd = 17 * 60 + 59;

  if (endMinutes > workDayEnd) {
    return null;
  }

  // Adjust end hour and minute when the end minute is 59
  let endHour = Math.floor(endMinutes / 60) % 24;
  let endMinute = endMinutes % 60;

  if (endMinute === 0) {
    endHour -= 1;
    endMinute = 59;
  }

  // Format end time as string (add leading zeros if needed)
  return `${endHour < 10 ? "0" + endHour : endHour}:${
    endMinute < 10 ? "0" + endMinute : endMinute
  }`;
};

// Function to check if a time slot overlaps with any existing unavailability slot
export const isOverlapping = (
  slot: TimeSlot,
  unavailabilities: TimeSlot[]
): boolean => {
  return unavailabilities.some((unavailability) => {
    return (
      slot.day === unavailability.day &&
      !(slot.end <= unavailability.start || slot.start >= unavailability.end)
    );
  });
};

export const findAvailableMeetingSlots = (
  timeSlots: TimeSlot[]
): string | null => {
  for (let day = 1; day <= 5; day++) {
    let startTime = "08:00";
    let foundSlot = false;
    let earliestSlot = "";

    for (const slot of timeSlots) {
      if (slot.day === day && slot.start >= startTime) {
        const duration = calculateDuration(startTime, slot.start);

        if (
          duration >= 60 &&
          !isOverlapping({ day, start: startTime, end: slot.start }, timeSlots)
        ) {
          const end = calculateEndTime(startTime, 60);

          if (end && end <= "17:59") {
            // Increment start time by 1 minute to avoid overlapping with the same slot
            const [startHour, startMinute] = startTime.split(":").map(Number);
            if (startMinute === 59) {
              console.log("startMinute", startMinute, startHour);

              startTime = `${startHour + 1}:00`;
            } else if (startMinute !== 0) {
              startTime = `${startHour}:${startMinute + 1}`;
            }

            const slotString = `${day} ${startTime}-${end}`;
            if (!foundSlot || slotString < earliestSlot) {
              foundSlot = true;
              earliestSlot = slotString;
            }
          }
        }

        startTime = slot.end;
      }
    }

    if (foundSlot) {
      return earliestSlot;
    }
  }

  return null;
};
