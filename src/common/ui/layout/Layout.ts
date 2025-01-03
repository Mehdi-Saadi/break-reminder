import Component from '@/common/ui/base/Component.ts';
import Sidebar from '@/common/ui/layout/Sidebar.ts';

class Layout extends Component {
  protected pageContainer: HTMLDivElement;

  constructor() {
    super('div', 'size-full min-h-screen grid grid-cols-3 bg-[#f3f3f3] text-gray-800 dark:bg-[#202020] dark:text-white select-none');

    const sidebarContainer = document.createElement('div');
    sidebarContainer.setAttribute('class', 'col-span-1');
    new Sidebar().mount(sidebarContainer);

    this.pageContainer = document.createElement('div');
    this.pageContainer.setAttribute('class', 'col-span-2 py-6 ps-3 pe-7');

    this.element.appendChild(sidebarContainer);
    this.element.appendChild(this.pageContainer);
  }
}

export default Layout;
