import Component from '@/shared/ui/base/Component.ts';

class BehaviorView extends Component {
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
    headerEl.innerHTML = 'About Break Reminder';
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-2');

    const firstParagraph = document.createElement('p');
    firstParagraph.innerHTML = 'Break Reminder helps you stay healthy and focused by encouraging regular breaks during your work or study sessions.';

    const secondParagraph = document.createElement('p');
    secondParagraph.innerHTML = 'It runs quietly in the background, gently reminding you to pause — without interrupting fullscreen activities like games or videos.';

    paragraphWrapper.appendChild(firstParagraph);
    paragraphWrapper.appendChild(secondParagraph);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }

  private createDesignSection(): void {
    const sectionEl = document.createElement('section');

    const headerEl = document.createElement('h2');
    headerEl.innerHTML = 'Designed with Care';
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-2');

    const firstParagraph = document.createElement('p');
    firstParagraph.innerHTML = 'Break Reminder is built with user focus and health in mind. We respect your workflow, privacy, and device performance — no tracking, no ads, just helpful reminders to step away when it’s time.';

    paragraphWrapper.appendChild(firstParagraph);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }

  private createFeedbackAndSupportSection(): void {
    const sectionEl = document.createElement('section');

    const headerEl = document.createElement('h2');
    headerEl.innerHTML = 'Feedback & Support';
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-2');

    // first paragraph start
    const firstParagraph = document.createElement('p');
    firstParagraph.innerHTML = 'Have an idea or found a bug? We’d love to hear from you!';
    // first paragraph end

    // second paragraph start
    const secondParagraph = document.createElement('p');

    const secondPTitleEl = document.createElement('span');
    secondPTitleEl.setAttribute('class', 'me-1');
    secondPTitleEl.innerText = 'Reach out at:';

    const emailEl = document.createElement('a');
    emailEl.setAttribute('href', 'mailto:mehdi.0.saadi@gmail.com');
    emailEl.setAttribute('class', 'text-blue-300 underline');
    emailEl.innerText = 'mehdi.0.saadi@gmail.com';

    secondParagraph.appendChild(secondPTitleEl);
    secondParagraph.appendChild(emailEl);
    // second paragraph end

    // third paragraph start
    const thirdParagraph = document.createElement('p');

    const thirdTitleEl = document.createElement('span');
    thirdTitleEl.setAttribute('class', 'me-1');
    thirdTitleEl.innerText = 'Or visit:';

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
    headerEl.innerHTML = 'Check for Updates';
    headerEl.setAttribute('class', 'text-base font-semibold mb-3');

    const paragraphWrapper = document.createElement('div');
    paragraphWrapper.setAttribute('class', 'text-sm space-y-5');

    const firstParagraph = document.createElement('p');
    firstParagraph.innerHTML = 'You\'re currently using version v0.3.0.';

    const checkForUpdatesBtn = document.createElement('button');
    checkForUpdatesBtn.setAttribute('class', 'cursor-pointer border border-gray-300 rounded-md px-5 py-3');
    checkForUpdatesBtn.setAttribute('type', 'button');
    checkForUpdatesBtn.innerText = 'Check for Updates';

    paragraphWrapper.appendChild(firstParagraph);
    paragraphWrapper.appendChild(checkForUpdatesBtn);

    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(paragraphWrapper);

    this.element.appendChild(sectionEl);
  }
}

export default BehaviorView;
