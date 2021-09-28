import { toTry } from "../index";

describe("toTry", () => {
  describe("Sync Tests - Result: Array", () => {
    const throwable = (error = false) => {
      if (error) {
        throw new Error("Catch me");
      }

      return "Hello World";
    };

    it("should return result of throwable function without error when successful", () => {
      // Act
      const [result, error] = toTry(() => throwable());

      // Assert
      expect(result).toEqual("Hello World");
      expect(error).toBeFalsy();
    });

    it("should return result of throwable function with error when unsuccessful", () => {
      // Act
      const [result, error] = toTry(() => throwable(true));

      // Assert
      expect(result).toBeFalsy();
      expect(error.message).toEqual("Catch me");
    });

    it("should return result of throwable function with error when unsuccessful and perform a unique handle", () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, "log");
      const weFoundError = (error: Error) => {
        console.log(error.message);
      };
      // Act
      const [result, error] = toTry(() => throwable(true), weFoundError);

      // Assert
      expect(result).toBeFalsy();
      expect(error.message).toEqual("Catch me");
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Catch me");
    });
  });

});

