import { describe, expect, test } from "vitest";
import { useAtom, atom } from "jotai";
import { render, screen, fireEvent } from "@testing-library/react";

const nameAtom = atom("init");

const NamePlate = () => {
  const [name, setName] = useAtom(nameAtom);

  const ClickHandler = () => {
    setName("changed");
  };

  return (
    <>
      <div data-testid="nameplate">{name}</div>
      <div onClick={ClickHandler}>button</div>
    </>
  );
};

describe("test", () => {
  test("name", () => {
    render(<NamePlate />);
    const button = screen.getByText("button");
    const nameplate = screen.getByTestId("nameplate");
    expect(nameplate.textContent).toBe("init");
    fireEvent.click(button);
    expect(nameplate.textContent).toBe("changed");
  });
});
