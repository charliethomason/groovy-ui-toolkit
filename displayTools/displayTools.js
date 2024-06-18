export class DisplayTools {
  constructor() {
    this.progressBarLabel = document.createElement('label');
    this.progressBar = document.createElement('progress');
    this.progressBar.id = 'progress-bar';
  }

  static createProgressBar(instance) {
    instance.progressBarLabel.textContent = 'Progress: ';
    instance.progressBar.max = 100;
    instance.progressBar.value = 0;
    document.body.appendChild(instance.progressBarLabel);
    document.body.appendChild(instance.progressBar);
  }

  useProgressBar() {
    DisplayTools.createProgressBar(this);
  }

  updateProgressBar(value) {
    this.progressBar.value = value;
  }
}
