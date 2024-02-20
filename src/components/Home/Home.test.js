import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Home";
import store from "../../redux/store/store";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("Home Component", () => {
  it("renders Home text", () => {
    const { getAllByText } = renderWithRedux(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const title = getAllByText(/this is the home/i);
    expect(title).toBeInTheDocument;
  });
});
