import '@testing-library/jest-dom';
import ComponentToTestModal from './ComponentToTestModal.vue';
import { render, screen } from '@testing-library/vue';

type RenderComponentParams = {
  isModalVisible: boolean;
};

const renderComponent = async ({ isModalVisible }: RenderComponentParams) => {
  render(ComponentToTestModal, { props: { isModalVisible } });

  await screen.findByTestId('modal');
};

describe('Component: Modal', () => {
  it('should render correctly', async () => {
    await renderComponent({ isModalVisible: true });

    screen.getByText('Modal Header');
    screen.getByText('Modal Body');
    screen.getByText('Modal Footer');
  });

  it('should not be visible', async () => {
    await renderComponent({ isModalVisible: false });
    expect(screen.getByTestId('modal')).not.toBeVisible();
  });
});
