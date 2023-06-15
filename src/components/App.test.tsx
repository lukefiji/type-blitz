import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Renders heading', () => {
    render(<App />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Quick React Boilerplate'
    );
  });
});
