import { render } from "@testing-library/react";
import Link from "./Link";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../redux/store/store";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const defaultProps = {
    url: "https://testUrl.com",
    children: "Text link",
};

describe("SideBar Component", () => {
  it("renders text correctly", () => {
    const { getAllByText } = renderWithRedux(
      <BrowserRouter>
        <Link {...defaultProps}/>
      </BrowserRouter>
    );
    const linkLoginText = getAllByText(/text link/i);
    expect(linkLoginText).toBeInTheDocument;
  });
});