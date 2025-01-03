import Component from '@/common/ui/base/Component.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');
    this.element.innerText = 'Advanced Page';
  }
}

export default SettingsPage;
