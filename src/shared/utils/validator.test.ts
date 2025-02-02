import { validator } from './validator.util.ts';
import { describe, test, expect } from 'vitest';

describe("Validator", () => {
  describe("validatePassword", () => {
    test("should return true for valid passwords", () => {
      expect(validator.validatePassword("StrongP@ss1")).toBe(true);
      expect(validator.validatePassword("A1b2c3D!")).toBe(true);
      expect(validator.validatePassword("MyP@ssw0rd!")).toBe(true);
    });
    
    test("should return false for passwords that are too short", () => {
      expect(validator.validatePassword("Short1!")).toBe(false);
      expect(validator.validatePassword("Aa1!")).toBe(false);
    });
    
    test("should return false for passwords missing uppercase letters", () => {
      expect(validator.validatePassword("weakpassword1!")).toBe(false);
    });
    
    test("should return false for passwords missing lowercase letters", () => {
      expect(validator.validatePassword("UPPERCASE1!")).toBe(false);
    });
    
    test("should return false for passwords missing numbers", () => {
      expect(validator.validatePassword("NoNumbers!")).toBe(false);
    });
    
    test("should return false for passwords missing special characters", () => {
      expect(validator.validatePassword("NoSpecial1")).toBe(false);
    });
  });
  
  describe("validateEmail", () => {
    test("should return true for valid emails", () => {
      expect(validator.validateEmail("test@example.com")).toBe(true);
      expect(validator.validateEmail("user.name@domain.co")).toBe(true);
      expect(validator.validateEmail("name+tag@sub.domain.com")).toBe(true);
    });
    
    test("should return false for emails without '@'", () => {
      expect(validator.validateEmail("invalidemail.com")).toBe(false);
    });
    
    test("should return false for emails without a domain", () => {
      expect(validator.validateEmail("user@")).toBe(false);
    });
    
    test("should return false for emails with invalid characters", () => {
      expect(validator.validateEmail("user@domain,com")).toBe(false);
      expect(validator.validateEmail("user@domain@domain.com")).toBe(false);
    });
    
    test("should return false for empty email strings", () => {
      expect(validator.validateEmail("")).toBe(false);
    });
  });
});
