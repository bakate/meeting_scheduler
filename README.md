# React + TypeScript + Vite

## Technical skills

Frequently, you must schedule 60-minute meetings with colleagues, but everyone has packed schedules. Google Calendar provides everyone's unavailability. Why not automate the process of finding available times?


### Data format

The data is located in the data folder.

**Input**

Each line represents an unavailable time slot in the format` d hh:mm-hh:mm`

`d` represents the day of the week (1 to 5, Monday to Friday).

`hh:mm-hh:mm` denotes the time slot for that day, including start and end times.

Work hours are from **Monday** to **Friday**, from **08:00** to **17:59**. All unavailable slots are included.


**Output**

A line in the format `d hh:mm-hh:mm`, represents the found meeting schedule. It must:

- Not intersect with any colleague's unavailability slot.
- Be within work hours without exceeding them.
- Be exactly 60 minutes long, including start and end times (e.g., 14:00-14:59).
- Be the earliest possible solution if multiple options exist.


**Example**

For the input:

```
1 08:45-12:59
3 11:09-11:28
5 09:26-09:56
5 16:15-16:34
3 08:40-10:12
```

the solution is:

```
1 13:00-13:59
```

On the first day, there's only one unavailable slot from 08:45 to 12:59. By starting the meeting at 13:00 and ending it at 13:59, it won't intersect with any unavailable slots.
