import Component from '@/common/ui/base/Component.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');
    this.element.innerText = 'Break Messages Page';
  }
}

export default SettingsPage;
