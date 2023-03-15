import { describe, expect, test } from "vitest";
import { useAtom, atom } from "jotai";
import { render, screen, fireEvent } from "@testing-library/react";

type InitState = { state: "initial" };
type MiddleState = { state: "middle" };
type FinalState = { state: "final" };
type AllState = InitState | MiddleState | FinalState;

const initState: InitState = { state: "initial" };
const middleState: MiddleState = { state: "middle" };
const stateAtom = atom<AllState>(initState);
const testid = "stateDisplay";

const StateDisplayComponent = () => {
  const [state, setState] = useAtom(stateAtom);
  const ClickHandler = () => {
    setState(middleState);
  };
  return (
    <>
      <div data-testid={testid}>{state.state}</div>
      <div onClick={ClickHandler}>button</div>
    </>
  );
};

describe("test", () => {
  test("state", () => {
    render(<StateDisplayComponent />);
    const button = screen.getByText("button");
    const stateDisplay = screen.getByTestId(testid);
    expect(stateDisplay.textContent).toBe(initState.state);
    fireEvent.click(button);
    expect(stateDisplay.textContent).toBe(middleState.state);
  });
});
