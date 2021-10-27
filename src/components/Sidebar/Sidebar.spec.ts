import Sidebar from './Sidebar.vue';
import sidebarOptions from './sidebarOptions';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

const renderComponent = async () => {
  render(Sidebar);

  await screen.findByLabelText('Barra de navegação lateral');
};

describe('Component: Sidebar', () => {
  it('should render options correctly', async () => {
    await renderComponent();

    sidebarOptions.forEach((option) => {
      screen.getByText(option.label);
    });
  });

  it('should navigate to the correct route when user clicks on a link', async () => {
    await renderComponent();

    userEvent.click(screen.getByText('Animais'));
  });
});
