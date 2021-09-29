import { toTryAsync, toTryAsyncObject } from "../index";

describe("toTryAsync", () => {
  describe("Async Tests - Result: Array", () => {
    const asyncThrowable = (error = false) => {
      return new Promise((res, rej) => {
        if (error) {
          rej(new Error("Catch me"));
        }
        res("Hello World");
      });
    };

    it("should return result of throwable function without error when successful", async () => {
      // Act
      const [result, error] = await toTryAsync(() => asyncThrowable());

      // Assert
      expect(result).toEqual("Hello World");
      expect(error).toBeFalsy();
    });

    it("should return result of throwable function with error when unsuccessful", async () => {
      // Act
      const [result, error] = await toTryAsync(() => asyncThrowable(true));

      // Assert
      expect(result).toBeFalsy();
      expect(error.message).toEqual("Catch me");
    });

    it("should return result of throwable function with error when unsuccessful and perform a unique handle", async () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, "log");
      const weFoundError = (error: Error) => {
        console.log(error.message);
      };
      // Act
      const [result, error] = await toTryAsync(() => asyncThrowable(true), weFoundError);

      // Assert
      expect(result).toBeFalsy();
      expect(error.message).toEqual("Catch me");
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Catch me");
    });
  });

   describe("Async Tests - Result: Object", () => {
    const asyncThrowable = (error = false) => {
      return new Promise((res, rej) => {
        if (error) {
          rej(new Error("Catch me"));
        }
        res("Hello World");
      });
    };

    it("should return result of throwable function without error when successful", async () => {
      // Act
      const {result, err} = await toTryAsyncObject(() => asyncThrowable());

      // Assert
      expect(result).toEqual("Hello World");
      expect(err).toBeFalsy();
    });

    it("should return result of throwable function with error when unsuccessful", async () => {
      // Act
      const {result, err} = await toTryAsyncObject(() => asyncThrowable(true));

      // Assert
      expect(result).toBeFalsy();
      expect(err.message).toEqual("Catch me");
    });

    it("should return result of throwable function with error when unsuccessful and perform a unique handle", async () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, "log");
      const weFoundError = (error: Error) => {
        console.log(error.message);
      };
      // Act
      const {result, err} = await toTryAsyncObject(() => asyncThrowable(true), weFoundError);

      // Assert
      expect(result).toBeFalsy();
      expect(err.message).toEqual("Catch me");
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Catch me");
    });
  });
});