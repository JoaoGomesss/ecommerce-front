import { render, fireEvent } from "@testing-library/react";
import CustomInput from "./custom.input.component";
import Colors from "../../theme/theme.colors";
import userEvent from "@testing-library/user-event";

describe("Custom Input", () => {
  it("should render with error if hasError is true", () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={true} />,
    );

    const input = getByPlaceholderText("lorem ipsum");
    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` });
  });

  it("should render without error if hasError is false", () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={false} />,
    );

    const input = getByPlaceholderText("lorem ipsum");

    expect(input).toHaveStyle({ border: "none" });
  });

  it("should change value when user types", () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={true} />,
    );

    const input = getByPlaceholderText("lorem ipsum");

    userEvent.type(input, "Dolar sit");

    getByDisplayValue("Dolar sit");
  });
});
