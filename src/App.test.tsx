import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {getMonth} from "./services/date/DateUtils";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe("month table test", () => {
  it("for today", () => {
    const date = new Date();
    const res = getMonth(date);
    expect(res[0]).toBe(0);
  });
});
