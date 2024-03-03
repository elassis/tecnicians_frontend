import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ProfessionSelect from "./ProfessionSelect";
import store from "../../../redux/store/store";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const defaultProps = {
  selectName: "selectOne",
  inputName: "inputOne",
  items: [
    { id: 0, name: "itemOne" },
    { id: 1, name: "itemTwo" },
  ],
  placeholder: "enter value",
  onChange: jest.fn(),
  onClickAdd: jest.fn(),
  onClickRemove:jest.fn(),
  register: jest.fn(),
};
describe("ProfessionSelect component", () => {
  it("renders items", () => {
    const { getByText } = renderWithRedux(
      <BrowserRouter>
        <ProfessionSelect {...defaultProps} />
      </BrowserRouter>
    );

    expect(getByText("itemOne")).toBeInTheDocument;
  });

  it("triggers onclick function", () => {
    const { getByTestId } = renderWithRedux(
      <BrowserRouter>
        <ProfessionSelect {...defaultProps} />
      </BrowserRouter>
    );

    const elementToClick = getByTestId("add-element");

    fireEvent.click(elementToClick);
    expect(defaultProps.onClickAdd).toHaveBeenCalledTimes(1);
  });
});
