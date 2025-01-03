import { NAVIGATION_EVENTS, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarAdvancedButton extends SidebarNavigationButton {
  constructor() {
    super(
      icon('doubleArrowRight', 'size-5 me-1.5'),
      'Advanced'
    )
  }

  private clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.ADVANCED);
  }

  protected onMounted(): void {
    this.element.addEventListener('click', this.clickHandler)
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('click', this.clickHandler)
  }
}

export default SidebarAdvancedButton;
