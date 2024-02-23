import { render } from "@testing-library/react";
import Text from "./Text";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../redux/store/store";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const defaultProps = {
    children: "Test Text",
};

describe("Text Component", () => {
  it("renders text correctly", () => {
    const { getAllByText } = renderWithRedux(
      <BrowserRouter>
        <Text {...defaultProps}/>
      </BrowserRouter>
    );
    const testText = getAllByText(/test text/i);
    expect(testText).toBeInTheDocument;
  });
});