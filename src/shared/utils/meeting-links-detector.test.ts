import { meetingLinksDetector } from './meeting-links-detector.util.ts';
import { test, describe, expect } from 'vitest';

describe("MeetingLinkDetector", () => {
  test("should return true for valid Google Meet links", () => {
    expect(meetingLinksDetector.detect('meet.google.com/abc-defg-hij')).toBe(true);
    expect(meetingLinksDetector.detect('g.co/meet/abcdef')).toBe(true);
    expect(meetingLinksDetector.detect('apps.google.com/meet/')).toBe(true);
  });
  
  test("should return true for valid Zoom links", () => {
    expect(meetingLinksDetector.detect('zoom.us/j/1234567890')).toBe(true);
    expect(meetingLinksDetector.detect('us04web.zoom.us/j/987654321')).toBe(true);
    expect(meetingLinksDetector.detect('us05web.zoom.us/j/555555555')).toBe(true);
  });
  
  test("should return false for invalid or similar links", () => {
    expect(meetingLinksDetector.detect('meet.google.com_wrong/abc-defg-hij')).toBe(false);
    expect(meetingLinksDetector.detect('g.co/meet_wrong/abcdef')).toBe(false);
    expect(meetingLinksDetector.detect('zoom.us/notj/1234567890')).toBe(false);
    expect(meetingLinksDetector.detect('randomwebsite.com/meet/123')).toBe(false);
    expect(meetingLinksDetector.detect('us04web.zoom.us/notj/987654321')).toBe(false);
  });
  
  test("should return false for empty or invalid input", () => {
    expect(meetingLinksDetector.detect('')).toBe(false);
    expect(meetingLinksDetector.detect(' ')).toBe(false);
    expect(meetingLinksDetector.detect('random text')).toBe(false);
  });
});
