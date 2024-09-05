import { render } from "@testing-library/react";
import InputErrorMessage from "./input.error.message";
import Colors from "../../theme/theme.colors";

describe("Input Error Message", () => {
  it("should show message with error color", () => {
    const { getByText } = render(
      <InputErrorMessage>lorem ipsum</InputErrorMessage>,
    );

    const input = getByText("lorem ipsum");

    expect(input).toHaveStyle({ color: Colors.error });
  });
});
