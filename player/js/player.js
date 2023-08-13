const songs = [
    {
        "title": "Made for you",
        "author": "OneRepublic",
        "img": "made-for-you.jpeg",
        "track": "Made-For-You.m4a",
        "duration": 257
    },
    {
        "title": "Eat your young",
        "author": "Hozier",
        "img": "eat-your-young.jpeg",
        "track": "Eat-Your-Young.m4a",
        "duration": 242
    },
    {
        "title": "Біля серця",
        "author": "KOLA",
        "img": "bilya_serdcya.jpeg",
        "track": "bilya_serdcya.mp3",
        "duration": 136
    },
    {
        "title": "Місто весни (feat. Один в каное)",
        "author": "Океан Ельзи",
        "img": "misto_vesn.jpeg",
        "track": "misto_vesn.mp3",
        "duration": 252
    },
    {
        "title": "Чорне і біле",
        "author": "Зозуля",
        "img": "chorne_bile.jpeg",
        "track": "chorne_bile.mp3",
        "duration": 227
    },
    {
        "title": "Чути гімн",
        "author": "Skofka",
        "img": "chut_gimn.jpeg",
        "track": "chut_gimn.mp3",
        "duration": 148
    },
    {
        "title": "В Пустій Кімнаті",
        "author": "Yaktak, Jerry Heil",
        "img": "v_pusti_kimnati.jpeg",
        "track": "v_pusti_kimnati.mp3",
        "duration": 165
    },
    {
        "title": "Гей, соколи!",
        "author": "Олександр Пономарьов та Mykhailo Khoma",
        "img": "gey_sokoly.jpeg",
        "track": "gey_sokoly.mp3",
        "duration": 225
    },
    {
        "title": "Три слова",
        "author": "Kozak System",
        "img": "tri_slova.jpeg",
        "track": "tri_slova.mp3",
        "duration": 240
    },
    {
        "title": "Пісня Сміливих Дівчат",
        "author": "KAZKA",
        "img": "pisnya_divchat.jpeg",
        "track": "pisnya_divchat.mp3",
        "duration": 186
    }
];

function Player(playerSelector = '.music-player', songs = []) {
    // this = { __proto__: Player.prototype }

    this.songs = songs;
    this.$player = document.querySelector(playerSelector);
    this.$playlist = this.$player.querySelector('.music-player__playlist');
    this.$slider = this.$player.querySelector('.music-player__slider');
    this.$playPause = this.$slider.querySelector('.music-player__play-toggle');
    this.$sliderImagesBody = this.$slider.querySelector('.music-player__slider-images');
    this.$backBtn = this.$slider.querySelector('.music-player__switch-button--back');
    this.$nextBtn = this.$slider.querySelector('.music-player__switch-button--next');
    this.$progress = this.$player.querySelector('.music-player__progress');
    this.$progressWrapper = this.$progress.querySelector('.music-player__progress-wrapper');
    this.$broadcast = this.$player.querySelector('.music-player__broadcast');
    this.$title = this.$slider.querySelector('.music-player__title');
    this.$author = this.$slider.querySelector('.music-player__author');
    this.$audio = this.$player.querySelector('.music-player__audio');
    this.mode = this.$slider.classList.contains(Player.BIG_MODE_CLASS_NAME)
        ? Player.MODES.BIG
        : Player.MODES.SMALL;
    this.sliderAnimationMode = this.$sliderImagesBody.classList.contains(Player.SLIDE_ANIMATION_MODE)
        ? Player.ANIMATION_MODE.SLIDE
        : Player.ANIMATION_MODE.FADE;
    this.currentSongIndex = 0;

    this.clearPlaylist();

    this.$songs = songs.map(this.renderSong, this);

    this.$playlist.append(...this.$songs);

    this.$images = songs.map(this.renderSliderImage);

    this.clearSliderImages();

    this.$sliderImagesBody.append(...this.$images);

    this.$broadcast.addEventListener('click', this.switchToSmall.bind(this));

    // this.$backBtn.addEventListener('click', this.switchAnimationMode.bind(this, Player.ANIMATION_MODE.SLIDE));
    // this.$nextBtn.addEventListener('click', this.switchAnimationMode.bind(this, Player.ANIMATION_MODE.SLIDE));

    this.$title.addEventListener('click', this.switchToBig.bind(this));
    this.$author.addEventListener('click', this.switchToBig.bind(this));
    this.$backBtn.addEventListener('click', this.switchBackSong.bind(this));
    this.$nextBtn.addEventListener('click', this.switchNextSong.bind(this));
    this.$playPause.addEventListener('click', this.playToggle.bind(this));
    this.$audio.addEventListener('timeupdate', this.timeupdate.bind(this));
    this.$progress.addEventListener('click', this.changeProgress.bind(this));

    this.render();

    // return this;
}

Player.BIG_MODE_CLASS_NAME = 'music-player__slider--big';
Player.ACTIVE_IMAGE_CLASS = 'music-player__slider-image--active';
Player.NEXT_IMAGE_CLASS = 'music-player__slider-image--next';
Player.BACK_IMAGE_CLASS = 'music-player__slider-image--back';
Player.SLIDE_ANIMATION_MODE = 'music-player__slider-images--slide';
Player.PAUSE_CLASSNAME = 'music-player__play-toggle--pause';
Player.PLAY_CLASSNAME = 'music-player__play-toggle--play';
Player.ANIMATION_MODE = {
    SLIDE: 'slide',
    FADE: 'fade',
}
Player.MODES = {
    BIG: 'big',
    SMALL: 'small'
}

// Player.prototype = { constructor: Player }

Player.prototype.switchToBig = function () {
    this.mode = Player.MODES.BIG;
    this.render();
}

Player.prototype.switchToSmall = function () {
    this.mode = Player.MODES.SMALL;
    this.render();
}

Player.prototype.clearPlaylist = function () {
    // this
    this.$playlist.innerText = '';
}

Player.prototype.clearSliderImages = function () {
    // this
    this.$sliderImagesBody.innerText = '';
}

Player.prototype.switchAnimationMode = function (mode) {
    this.sliderAnimationMode = mode;
    // this.render();
}

Player.prototype.changeProgress = function (e) {
    const mainRect = this.$progressWrapper.getBoundingClientRect();
    const { clientX } = e;
    const value = Math.min( 1, Math.max(0 , (clientX - mainRect.left) / mainRect.width));
    const time = this.$audio.duration * value;

    this.$audio.currentTime = time;
}

Player.prototype.changeCurrentSong = function (songIndex) {
    this.currentSongIndex = songIndex;
    console.log(this.$audio);

    const currentSong = this.songs[this.currentSongIndex];
    const paused = this.$audio.paused;

    this.$audio.src = `songs/${currentSong.track}`;
    this.$audio.currentTime = 0;

    if (!paused) {
        this.$audio.play();
    }

    this.$progress.style.setProperty('--value', `0%`);

    this.render();
}

Player.prototype.timeupdate = function (e) {
    const progressValue = this.$audio.currentTime*100 / this.$audio.duration;

    this.$progress.style.setProperty('--value', `${progressValue.toFixed(3)}%`);
}

Player.prototype.switchSong = function (songIndex) {
    this.switchAnimationMode(Player.ANIMATION_MODE.FADE);
    this.changeCurrentSong(songIndex);
}

Player.prototype.switchBackSong = function (songIndex) {
    this.switchAnimationMode(Player.ANIMATION_MODE.SLIDE);
    this.changeCurrentSong(this.currentSongIndex - 1);
}

Player.prototype.switchNextSong = function (songIndex) {
    this.switchAnimationMode(Player.ANIMATION_MODE.SLIDE);
    this.changeCurrentSong(this.currentSongIndex + 1);
}

Player.prototype.renderSong = function (song, songIndex) {
    const $li = document.createElement('li');
    const { duration } = song;
    const mm = Math.floor(duration / 60);
    const ss = duration % 60;

    $li.className = 'music-player__song';

    $li.innerHTML = `
        <img
            src="songs/${song.img}"
            class="music-player__song-img">
        <div class="music-player__song-title music-player__title">
            ${song.title}
        </div>
        <div class="music-player__song-author music-player__author">
            ${song.author}
        </div>
        <div class="music-player__song-duration">
            ${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}
        </div>
    `;

    // $li.addEventListener('click', this.switchAnimationMode.bind(this, Player.ANIMATION_MODE.FADE));
    $li.addEventListener('click', this.switchSong.bind(this, songIndex));

    return $li;
}

Player.prototype.playToggle = function () {
    if (this.$audio.paused) {
        this.$audio.play();
    } else {
        this.$audio.pause();
    }

    this.render();
}

Player.prototype.renderSliderImage = function (song) {
    const $el = document.createElement('img');

    $el.className = 'music-player__slider-image';
    $el.src = `songs/${song.img}`;
    $el.alt = '';

    return $el;
}

Player.prototype.render = function () {
    if (this.mode === Player.MODES.BIG) {
        this.$slider.classList.add(Player.BIG_MODE_CLASS_NAME);
    } else if (this.mode === Player.MODES.SMALL) {
        this.$slider.classList.remove(Player.BIG_MODE_CLASS_NAME);
    }

    const currentSong = this.songs[this.currentSongIndex];
    const { title, author } = currentSong;
    const { currentSongIndex } = this;

    this.$title.innerText = title;
    this.$author.innerText = author;

    this.$images.forEach(function ($image, idx) {
        if (idx !== currentSongIndex) {
            $image.classList.remove(Player.ACTIVE_IMAGE_CLASS);
        } else {
            $image.classList.add(Player.ACTIVE_IMAGE_CLASS);
        }

        if (idx < currentSongIndex) {
            $image.classList.remove(Player.NEXT_IMAGE_CLASS);
            $image.classList.add(Player.BACK_IMAGE_CLASS);
        } else if (idx === currentSongIndex) {
            $image.classList.remove(Player.NEXT_IMAGE_CLASS);
            $image.classList.remove(Player.BACK_IMAGE_CLASS);
        } else if (idx > currentSongIndex) {
            $image.classList.add(Player.NEXT_IMAGE_CLASS);
            $image.classList.remove(Player.BACK_IMAGE_CLASS);
        }
    });

    if (this.sliderAnimationMode === Player.ANIMATION_MODE.SLIDE) {
        this.$sliderImagesBody.classList.add(Player.SLIDE_ANIMATION_MODE);
    } else {
        this.$sliderImagesBody.classList.remove(Player.SLIDE_ANIMATION_MODE);
    }

    if (this.$audio.paused) {
        this.$playPause.classList.remove(Player.PAUSE_CLASSNAME);
        this.$playPause.classList.add(Player.PLAY_CLASSNAME);
    } else {
        this.$playPause.classList.add(Player.PAUSE_CLASSNAME);
        this.$playPause.classList.remove(Player.PLAY_CLASSNAME);
    }
}

const player = new Player('.music-player', songs);

console.log(player);