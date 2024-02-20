import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SignUp from "./SignUp";
import store from "../../redux/store/store";

test("renders sign up text", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );
  const title = screen.getByText(/sign up/i);
  expect(title).toBeInTheDocument;
});
