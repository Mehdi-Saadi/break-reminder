import updater from '@/modules/updater';
import notify from '@/shared/notification.ts';
import Component from '@/shared/ui/base/Component.ts';
import t from '@/modules/i18n';

class BehaviorView extends Component {
  private appVersion: string = 'v0.3.0';
  private supportEmail: string = 'mehdi.0.saadi@gmail.com';
  private supportPage: string = 'https://github.com/Mehdi-Saadi/break-reminder/issues';
  private checkForUpdatesBtn: HTMLButtonElement | null = null;
  private updateBtn: HTMLButtonElement | null = null;

  constructor() {
    super('div', 'space-y-5');

    this.createAboutSection();
    this.createDesignSection();
    this.createFeedbackAndSupportSection();
    this.createCheckForUpdatesSection();
  }

  private createAboutSection(): void {
    const sectionEl = document.createElement('section');

    const headerEl = document.createElement('h2');
    headerEl.innerText = t('aboutSoftware');
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-2');

    const firstParagraph = document.createElement('p');
    firstParagraph.innerText = t('aboutSoftwareFirstInfo');

    const secondParagraph = document.createElement('p');
    secondParagraph.innerText = t('aboutSoftwareSecondInfo');

    paragraphWrapper.appendChild(firstParagraph);
    paragraphWrapper.appendChild(secondParagraph);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }

  private createDesignSection(): void {
    const sectionEl = document.createElement('section');

    const headerEl = document.createElement('h2');
    headerEl.innerText = t('designedWithCare');
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-2');

    const firstParagraph = document.createElement('p');
    firstParagraph.innerText = t('designedWithCareFirstInfo');

    paragraphWrapper.appendChild(firstParagraph);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }

  private createFeedbackAndSupportSection(): void {
    const sectionEl = document.createElement('section');

    const headerEl = document.createElement('h2');
    headerEl.innerText = t('feedbackAndSupport');
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-2');

    // first paragraph start
    const firstParagraph = document.createElement('p');
    firstParagraph.innerText = t('feedbackAndSupportFirstInfo');
    // first paragraph end

    // second paragraph start
    const secondParagraph = document.createElement('p');

    const secondPTitleEl = document.createElement('span');
    secondPTitleEl.setAttribute('class', 'me-1');
    secondPTitleEl.innerText = `${t('support')}:`;

    const emailEl = document.createElement('a');
    emailEl.setAttribute('href', `mailto:${this.supportEmail}`);
    emailEl.setAttribute('class', 'text-blue-500 dark:text-blue-300 underline');
    emailEl.innerText = this.supportEmail;

    secondParagraph.appendChild(secondPTitleEl);
    secondParagraph.appendChild(emailEl);
    // second paragraph end

    // third paragraph start
    const thirdParagraph = document.createElement('p');

    const thirdTitleEl = document.createElement('div');
    thirdTitleEl.setAttribute('class', 'me-1');
    thirdTitleEl.innerText = `${t('orVisit')}:`;

    const addressEl = document.createElement('a');
    addressEl.setAttribute('href', this.supportPage);
    addressEl.setAttribute('target', '_blank');
    addressEl.setAttribute('class', 'text-blue-500 dark:text-blue-300 underline');
    addressEl.innerText = this.supportPage;

    thirdParagraph.appendChild(thirdTitleEl);
    thirdParagraph.appendChild(addressEl);
    // third paragraph end

    paragraphWrapper.appendChild(firstParagraph);
    paragraphWrapper.appendChild(secondParagraph);
    paragraphWrapper.appendChild(thirdParagraph);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }

  private createCheckForUpdatesSection(): void {
    const sectionEl = document.createElement('section');

    const headerEl = document.createElement('h2');
    headerEl.innerText = t('checkForUpdates');
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-5');

    const firstParagraph = document.createElement('p');
    firstParagraph.innerText = `${t('currentVersion')}: ${this.appVersion}`;

    this.checkForUpdatesBtn = document.createElement('button');
    this.checkForUpdatesBtn.setAttribute('class', 'cursor-pointer border border-gray-300 rounded-md px-5 py-3 disabled:opacity-50 disabled:cursor-auto');
    this.checkForUpdatesBtn.setAttribute('type', 'button');
    this.checkForUpdatesBtn.innerText = t('checkForUpdates');

    this.updateBtn = document.createElement('button');
    this.updateBtn.setAttribute('class', 'cursor-pointer border border-gray-300 rounded-md px-5 py-3 disabled:opacity-50 disabled:cursor-auto hidden');
    this.updateBtn.setAttribute('type', 'button');
    this.updateBtn.innerText = t('update');

    paragraphWrapper.appendChild(firstParagraph);
    paragraphWrapper.appendChild(this.checkForUpdatesBtn);
    paragraphWrapper.appendChild(this.updateBtn);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }

  private handleCheckForUpdatesBtnClick = async (): Promise<void> => {
    if (!this.checkForUpdatesBtn || !this.updateBtn) {
      return;
    }

    this.checkForUpdatesBtn.innerText = t('pleaseWait');
    this.checkForUpdatesBtn.disabled = true;

    const update = await updater.checkForUpdate();

    this.checkForUpdatesBtn.innerText = t('checkForUpdates');
    this.checkForUpdatesBtn.disabled = false;

    if (!update) {
      return await notify(t('youAreUsingTheLatestVersion'));
    }

    this.checkForUpdatesBtn.classList.add('hidden');
    this.updateBtn.classList.remove('hidden');
  };

  private handleUpdateBtnClick = async (): Promise<void> => {
    if (!this.checkForUpdatesBtn || !this.updateBtn) {
      return;
    }

    this.updateBtn.innerText = t('pleaseWait');
    this.updateBtn.disabled = true;

    await updater.update();

    this.updateBtn.innerText = t('update');
    this.updateBtn.disabled = false;
    this.updateBtn.classList.add('hidden');
    this.checkForUpdatesBtn.classList.remove('hidden');
  };

  protected onMounted(): void {
    this.checkForUpdatesBtn?.addEventListener('click', this.handleCheckForUpdatesBtnClick);
    this.updateBtn?.addEventListener('click', this.handleUpdateBtnClick);
  }

  protected onUnmounted(): void {
    this.checkForUpdatesBtn?.removeEventListener('click', this.handleCheckForUpdatesBtnClick);
    this.updateBtn?.removeEventListener('click', this.handleUpdateBtnClick);
  }
}

export default BehaviorView;
