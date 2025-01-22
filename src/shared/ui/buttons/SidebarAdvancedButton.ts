import SidebarNavigationButton from '@/shared/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';

class SidebarAdvancedButton extends SidebarNavigationButton {
  constructor() {
    super(
      'advanced',
      icon('doubleArrowRight', 'size-5 me-1.5'),
      'Advanced',
    );
  }
}

export default SidebarAdvancedButton;
