import fs from "fs";
import { parseInputData } from "../meeting-scheduler";

describe("MeetingScheduler", () => {
  it("should parse input data", () => {
    const inputDataPath = "./data/input1.txt";
    const input = fs
      .readFileSync(inputDataPath, "utf-8")
      .split("\n")
      .filter((line) => line.trim() !== "");

    const parsedInput = parseInputData(input);
    const expectedOutput = [
      { day: 2, start: "08:24", end: "10:54" },

      { day: 1, start: "14:45", end: "14:47" },

      { day: 3, start: "09:56", end: "16:25" },

      { day: 5, start: "15:16", end: "16:28" },
    ];

    expect(parsedInput).toEqual(expectedOutput);
  });
});
