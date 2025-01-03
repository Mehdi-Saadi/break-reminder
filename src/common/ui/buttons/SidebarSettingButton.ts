import { NAVIGATION_EVENTS, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      icon('gear', 'size-5 me-1.5'),
      'Settings'
    )
  }

  private clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.SETTINGS);
  }

  protected onMounted(): void {
    this.element.addEventListener('click', this.clickHandler)
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('click', this.clickHandler)
  }
}

export default SidebarSettingButton;
