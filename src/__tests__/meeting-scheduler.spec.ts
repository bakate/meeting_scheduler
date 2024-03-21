import fs from "fs";
import {
  TimeSlot,
  calculateDuration,
  calculateEndTime,
  findAvailableMeetingSlots,
  isOverlapping,
  parseInputData,
} from "../meeting-scheduler";

describe("MeetingScheduler", () => {
  describe("Parsing Input Data", () => {
    it("should correctly parse input data from file", () => {
      const inputDataPath = "./data/input1.txt";
      const input = fs
        .readFileSync(inputDataPath, "utf-8")
        .split("\n")
        .filter((line) => line.trim() !== "");

      const parsedInput = parseInputData(input);

      const expectedOutput: TimeSlot[] = [
        { day: 1, start: "08:45", end: "12:59" },
        { day: 1, start: "14:45", end: "14:47" },
        { day: 2, start: "08:24", end: "10:54" },
        { day: 3, start: "09:56", end: "16:25" },
        { day: 5, start: "15:16", end: "16:28" },
      ];

      expect(parsedInput).toEqual(expectedOutput);
    });
  });

  describe("Calculating Duration", () => {
    it.each([
      ["08:24", "10:53", 150],
      ["17:00", "07:59", 900],
      ["12:00", "12:59", 60],
    ])(
      "should calculate the duration between %s and %s as %i minutes",
      (startTime, endTime, expectedOutput) => {
        const duration = calculateDuration(startTime, endTime);
        expect(duration).toBe(expectedOutput);
      }
    );
  });

  describe("Calculating End Time", () => {
    const duration = 60;

    it.each([
      ["08:23", "09:23"],
      ["12:00", "12:59"],
      ["17:00", null],
      ["11:59", "12:59"],
      ["17:59", null],
    ])(
      "should calculate the end time based on start time %s and duration as %s",
      (startTime, expectedOutput) => {
        const endTime = calculateEndTime(startTime, duration);
        expect(endTime).toBe(expectedOutput);
      }
    );
  });

  describe("Checking Overlapping Time Slots", () => {
    const unavailabilities: TimeSlot[] = [
      { day: 1, start: "08:00", end: "09:00" },
      { day: 2, start: "10:00", end: "12:00" },
      { day: 3, start: "14:00", end: "16:00" },
    ];

    it("should return true when the slot overlaps with an unavailability slot", () => {
      const slot: TimeSlot = { day: 1, start: "08:30", end: "09:30" };
      expect(isOverlapping(slot, unavailabilities)).toBe(true);
    });

    it("should return false when the slot does not overlap with any unavailability slot", () => {
      const slot: TimeSlot = { day: 1, start: "09:30", end: "10:30" };
      expect(isOverlapping(slot, unavailabilities)).toBe(false);
    });

    it("should return false when there are no unavailability slots", () => {
      const slot: TimeSlot = { day: 1, start: "08:00", end: "09:00" };
      expect(isOverlapping(slot, [])).toBe(false);
    });
  });

  describe("Finding Available Meeting Slots", () => {
    it("should find the earliest available meeting slot from parsed input", () => {
      const inputFilePath = "./data/input1.txt";
      const outputFilePath = "./data/output1.txt";
      const input = fs
        .readFileSync(inputFilePath, "utf-8")
        .split("\n")
        .filter((line) => line.trim() !== "");
      const output = fs
        .readFileSync(outputFilePath, "utf-8")
        .split("\n")
        .filter((line) => line.trim() !== "");

      const timeSlots = parseInputData(input);

      const availableMeetingSlot = findAvailableMeetingSlots(timeSlots);

      expect(availableMeetingSlot).toEqual(output[0]);
    });
  });
});
