// We are rendering <Appointment/> below, so we need to import React.createElement.
import React from 'react';

// We need the render helper function to allow us to render components, so we need to import the react-testing-library.
import {render} from '@testing-library/react';

// Import the componenet we are testing.
import Appointment from 'components/Appointment';

// Group a series of tests by wrapping them in a describe function.
describe('Appointment', () => {

  // A test that renders a React Component.
  // Can also be interchangeably written with the test() function instead of it().
  it('renders without crashing', () => {
    render(<Appointment />);
  });

});
