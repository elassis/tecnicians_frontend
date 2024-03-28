import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../redux/store/store";


const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};
describe("Navbar Component", () => {
  it("renders text correctly", () => {
    const { getAllByText } = renderWithRedux(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const title = getAllByText(/technicians freelance/i);
    expect(title).toBeInTheDocument;
  });
});
