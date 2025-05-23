import Component from '@/shared/ui/base/Component.ts';
import t from '@/modules/i18n';

class BehaviorView extends Component {
  private appVersion: string = 'v0.3.0';

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
    emailEl.setAttribute('href', 'mailto:mehdi.0.saadi@gmail.com');
    emailEl.setAttribute('class', 'text-blue-300 underline');
    emailEl.innerText = 'mehdi.0.saadi@gmail.com';

    secondParagraph.appendChild(secondPTitleEl);
    secondParagraph.appendChild(emailEl);
    // second paragraph end

    // third paragraph start
    const thirdParagraph = document.createElement('p');

    const thirdTitleEl = document.createElement('div');
    thirdTitleEl.setAttribute('class', 'me-1');
    thirdTitleEl.innerText = `${t('orVisit')}:`;

    const addressEl = document.createElement('a');
    addressEl.setAttribute('href', 'https://github.com/Mehdi-Saadi/break-reminder/issues');
    addressEl.setAttribute('target', '_blank');
    addressEl.setAttribute('class', 'text-blue-300 underline');
    addressEl.innerText = 'https://github.com/Mehdi-Saadi/break-reminder/issues';

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

    const checkForUpdatesBtn = document.createElement('button');
    checkForUpdatesBtn.setAttribute('class', 'cursor-pointer border border-gray-300 rounded-md px-5 py-3');
    checkForUpdatesBtn.setAttribute('type', 'button');
    checkForUpdatesBtn.innerText = t('checkForUpdates');

    paragraphWrapper.appendChild(firstParagraph);
    paragraphWrapper.appendChild(checkForUpdatesBtn);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }
}

export default BehaviorView;
