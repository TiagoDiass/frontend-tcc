import Button from './Button.vue';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

describe('Component: Button', () => {
  it('should render correctly', () => {
    render(Button, {
      props: { category: 'secondary' },
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

  it('should handleClick correctly', async () => {
    const { emitted } = render(Button, {
      slots: { default: 'Meu botão' },
    });

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(emitted()).toHaveProperty('click'));
  });
});
