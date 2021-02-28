import userReducer, { setToken } from "./userSlice";

describe("userSlice", () => {
  describe("actions", () => {
    it("should create an action to set user token", () => {
      const type = "user/setToken";
      const payload = "test";

      expect(setToken(payload)).toEqual({ type, payload });
    });
  });
  describe("reducers", () => {
    it("should return the initial state", () => {
      expect(userReducer(undefined, {})).toEqual({
        token: "",
      });
    });

    it("should handle setToken", () => {
      expect(userReducer(undefined, setToken("testToken"))).toEqual({
        token: "testToken",
      });
    });
  });
});
