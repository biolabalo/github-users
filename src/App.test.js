import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import UserSearch from "./Components/userSearch";


test('On page load the button is disabled', async () => {
    render(<UserSearch  />);  
    expect(screen.getByRole('button', { name: /Search/ })).toBeDisabled();

});

test('When a word is inputed  the button is enabled', async () => {
  render(<UserSearch  />);  
  userEvent.type(screen.getByPlaceholderText(/Enter a user name/i), "biolabalo");
  expect(await screen.findByRole('button', { name: /Search/i })).toBeEnabled();

});


test('Input should accept text',  () => {
  render(<UserSearch  />);  
  const inputNode  = screen.getByPlaceholderText(/Enter a user name/i);
  expect(inputNode.value).toMatch("")
  userEvent.type(screen.getByPlaceholderText(/Enter a user name/i), "biolabalo");
  expect(inputNode.value).toMatch("biolabalo")
});