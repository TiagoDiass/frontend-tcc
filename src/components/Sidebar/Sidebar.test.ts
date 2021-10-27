import Sidebar from './Sidebar.vue';
import sidebarOptions from './sidebarOptions';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

const renderComponent = async () => {
  const $routerMock = {
    push: jest.fn(),
  };

  render(Sidebar, { mocks: { $router: $routerMock } });

  await screen.findByLabelText('Barra de navegação lateral');

  return {
    $routerMock,
  };
};

describe('Component: Sidebar', () => {
  it('should render options correctly', async () => {
    await renderComponent();

    sidebarOptions.forEach((option) => {
      screen.getByText(option.label);
    });
  });

  it('should navigate to the correct route when user clicks on a link', async () => {
    const { $routerMock } = await renderComponent();
    const linkOption = sidebarOptions[3];

    userEvent.click(screen.getByText(linkOption.label));

    await waitFor(() => {
      expect($routerMock.push).toHaveBeenCalledTimes(1);
      expect($routerMock.push).toHaveBeenCalledWith({
        name: linkOption.routeName,
      });
    });
  });
});
