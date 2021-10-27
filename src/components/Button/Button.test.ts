import Button from './Button.vue';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';

describe('Component: Button', () => {
  it('should render correctly', () => {
    render(Button, {
      props: { type: 'secondary' },
      slots: { default: 'Meu botão' },
    });

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Meu botão');
    expect(button).toHaveClass('btn', 'btn-secondary');
  });

  it('should have primary type by default', () => {
    render(Button, {
      slots: { default: 'Meu botão' },
    });

    expect(screen.getByRole('button')).toHaveClass('btn', 'btn-primary');
  });
});
