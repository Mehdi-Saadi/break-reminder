import Component from '@/shared/ui/base/Component.ts';
import Sidebar from '@/modules/setting/layouts/Sidebar.ts';
import settingState from '@/shared/state/setting';

abstract class Layout extends Component {
  protected pageContainer: HTMLDivElement;

  protected constructor() {
    super('div', 'size-full min-h-screen grid grid-cols-3 bg-[#f3f3f3] text-gray-800 dark:bg-[#202020] dark:text-white select-none');

    this.setTheme();

    const sidebarContainer = document.createElement('div');
    sidebarContainer.setAttribute('class', 'col-span-1');
    new Sidebar().mount(sidebarContainer);

    this.pageContainer = document.createElement('div');
    this.pageContainer.setAttribute('class', 'col-span-2 py-6 ps-3 pe-7');

    this.element.appendChild(sidebarContainer);
    this.element.appendChild(this.pageContainer);

    this.initThemeListener();
  }

  private setTheme = (): void => {
    if (settingState.value.darkMode) {
      this.element.classList.add('dark');
    } else {
      this.element.classList.remove('dark');
    }
  };

  private initThemeListener(): void {
    settingState.subscribe((newValue, oldValue) => {
      if (newValue.darkMode !== oldValue.darkMode) {
        this.setTheme();
      }
    });
  }
}

export default Layout;
