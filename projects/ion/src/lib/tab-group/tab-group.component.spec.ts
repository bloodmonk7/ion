import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { TabComponent } from '../tab/tab.component';
import { SafeAny } from '../utils/safe-any';
import { TabGroupComponent, TabGroupProps } from './tab-group.component';

const selectEvent = jest.fn();
const mockTabs = [
  {
    name: 'Tab 1',
    selected: false,
  },
  {
    name: 'Tab 2',
    selected: false,
  },
];

const sut = async (
  customProps: TabGroupProps = {
    tabs: mockTabs,
    alignment: 'horizontal',
    selected: {
      emit: selectEvent,
    } as SafeAny,
  }
) => {
  await render(TabGroupComponent, {
    componentProperties: customProps,
    declarations: [TabComponent, IonIconComponent],
  });
  return { element: screen.getByTestId('ion-tab-group'), event: selectEvent };
};

describe('TabGroupComponent', () => {
  it('should render component in horizontal by default', async () => {
    const rendered = await sut();
    expect(rendered.element).not.toHaveClass('tab-group-column-inner');
    expect(screen.getByText(mockTabs[0].name)).toHaveClass('border-bottom');
  });

  it('should render tabs with border bottom by default', async () => {
    await sut();
    expect(screen.getByText(mockTabs[0].name)).toHaveClass('border-bottom');
  });

  it('should render component in vertical', async () => {
    const rendered = await sut({
      alignment: 'vertical',
      tabs: mockTabs,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(rendered.element.childNodes[0]).toHaveClass(
      'tab-group-column-inner'
    );
  });

  it('should emit tab selected when clicked', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockTabs[0].name));
    expect(rendered.event).toHaveBeenCalledWith({
      name: mockTabs[0].name,
      selected: true,
    });
  });

  it('should has border right when alignment is vertical', async () => {
    await sut({
      alignment: 'vertical',
      tabs: mockTabs,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(screen.getByText(mockTabs[0].name)).toHaveClass('border-right');
  });
});