import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../redux/store/store";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const defaultProps = {
  children: "Click me",
  callBack: jest.fn(),
};
describe("Button Component", () => {
  it("renders text correctly", () => {
    const { getByText } = renderWithRedux(
      <BrowserRouter>
        <Button {...defaultProps} />
      </BrowserRouter>
    );
    const buttonText = getByText(/click me/i);
    expect(buttonText).toBeInTheDocument;
  });

  it("triggers function onclick", () => {
    const { getByText } = renderWithRedux(
      <BrowserRouter>
        <Button {...defaultProps} />
      </BrowserRouter>
    );
    const button = getByText(defaultProps.children);
    fireEvent.click(button);
    expect(defaultProps.callBack).toHaveBeenCalledTimes(1);
  });
});
