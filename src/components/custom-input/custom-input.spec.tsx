import { render } from "@testing-library/react";
import CustomInput from "./custom.input.component";
import Colors from "../../theme/theme.colors";

describe("Custom Input", () => {
  it("should render with error if hasError is true", () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={true} />,
    );

    const input = getByPlaceholderText("lorem ipsum");
    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` });
  });
});
