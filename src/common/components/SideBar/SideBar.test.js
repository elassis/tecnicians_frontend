import { render } from "@testing-library/react";
import SideBar from "./SideBar";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../redux/store/store";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const defaultProps = {
  urls:{
    loginUrl: "https://testUrl.com",
    signUpUrl: "https://testUrl.com",
  }
};
describe("SideBar Component", () => {
  it("renders text correctly", () => {
    const { getAllByText } = renderWithRedux(
      <BrowserRouter>
        <SideBar {...defaultProps}/>
      </BrowserRouter>
    );
    const linkLoginText = getAllByText(/login/i);
    expect(linkLoginText).toBeInTheDocument;
  });
});
