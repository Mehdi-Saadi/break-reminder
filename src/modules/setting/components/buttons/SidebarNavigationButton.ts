import { NavigationPage, pageNavEventBus } from '@/modules/setting/events/page';
import Component from '@/shared/ui/base/Component.ts';

abstract class SidebarNavigationButton extends Component {
  protected activeIcon: HTMLDivElement;
  private activeClasses: string[] = ['bg-[#eaeaea]', 'dark:bg-[#2d2d2d]', 'hover:bg-[#ededed]', 'dark:hover:bg-[#292929]'];
  private notActiveClasses: string[] = ['hover:bg-[#eaeaea]', 'dark:hover:bg-[#2d2d2d]'];

  protected constructor(
    protected page: NavigationPage,
    htmlIcon: string,
    label: string,
  ) {
    super('button', 'flex items-center pe-4 py-2 rounded-md text-sm w-full cursor-pointer');

    this.element.setAttribute('type', 'button');

    this.activeIcon = document.createElement('div');
    this.activeIcon.setAttribute('class', 'min-w-0.5 min-h-4 max-w-0.5 max-h-4 bg-[#0067c0] rounded-full');

    this.element.appendChild(this.activeIcon);

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'flex items-center ps-1');

    // button icon
    wrapper.innerHTML = htmlIcon;

    // button label
    const span = document.createElement('span');
    span.setAttribute('class', 'pb-0.5');
    span.innerText = label;

    wrapper.appendChild(span);

    this.element.appendChild(wrapper);

    this.setNotActive();
    this.activateListener();
  }

  protected onMounted(): void {
    this.element.addEventListener('click', this.clickHandler);
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('click', this.clickHandler);
  }

  protected clickHandler = (): void => {
    pageNavEventBus.emit('navigate', this.page);
  };

  protected activateListener(): void {
    pageNavEventBus.on('navigate', (selectedPage: NavigationPage) => {
      if (selectedPage === this.page) {
        this.setActive();
      } else {
        this.setNotActive();
      }
    });
  }

  protected setActive(): void {
    this.element.classList.remove(...this.notActiveClasses);
    this.element.classList.add(...this.activeClasses);

    this.activeIcon.style.opacity = '1';
  }

  protected setNotActive(): void {
    this.element.classList.remove(...this.activeClasses);
    this.element.classList.add(...this.notActiveClasses);

    this.activeIcon.style.opacity = '0';
  }
}

export default SidebarNavigationButton;
