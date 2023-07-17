import { renderHook, act } from "@testing-library/react";
import { useCanvas, useEngine, useScene } from "./useMap";
import * as BABYLON from "babylonjs";

jest.mock("babylonjs", () => ({
  Engine: jest.fn().mockImplementation(() => ({
    dispose: jest.fn(),
  })),
  Scene: jest.fn(),
}));

describe("use Map", () => {
  let mockCanvas = {
    current: document.createElement("canvas"),
  };
  let mockEngine = {
    current: new BABYLON.Engine(mockCanvas.current, true),
  };

  beforeEach(() => {
    mockCanvas = { current: document.createElement("canvas") };
    mockEngine = {
      current: {
        ...new BABYLON.Engine(mockCanvas.current, true),
        dispose: jest.fn(),
      },
    };
  });

  test("useCanvas", () => {
    const { result } = renderHook(() => useCanvas());
    act(() => {
      result.current.current = mockCanvas.current;
    });
    expect(result.current.current).toEqual(mockCanvas.current);
  });

  test("useEngine", () => {
    const { result, unmount } = renderHook(() => useEngine(mockCanvas));
    act(() => {
      result.current.current = mockEngine.current;
    });

    expect(typeof result.current.current).toBe("object");

    // unmounting
    act(() => {
      unmount();
    });

    expect(result.current.current.dispose).toHaveBeenCalled();
  });

  test("useScene", () => {
    const { result } = renderHook(() => useScene(mockEngine));
    act(() => {
      result.current.current = new BABYLON.Scene(mockEngine.current);
    });
    expect(result.current.current).toBeInstanceOf(BABYLON.Scene);
  });
});
