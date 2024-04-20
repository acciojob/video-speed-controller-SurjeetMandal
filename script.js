const player = document.querySelector('.player__video');
const progress = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress');

function togglePlay() {
  const method = player.paused ? 'play' : 'pause';
  player[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleProgress() {
  const percent = (player.currentTime / player.duration) * 100;
  progress.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

function skip() {
  player.currentTime += parseFloat(this.dataset.skip);
}

player.addEventListener('click', togglePlay);
player.addEventListener('play', updateButton);
player.addEventListener('pause', updateButton);
player.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
volume.addEventListener('change', () => player.volume = volume.value);
playbackRate.addEventListener('change', () => player.playbackRate = playbackRate.value);
skipButtons.forEach(button => button.addEventListener('click', skip));
let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);

