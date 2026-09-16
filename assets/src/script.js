(function () {
  'use strict';

  var nationEmblems = [
  'assets/nation-emblems/mons.png',
  'assets/nation-emblems/liyue.png',
  'assets/nation-emblems/inazuma.png',
  'assets/nation-emblems/sumeru.png',
  'assets/nation-emblems/font.png',
  'assets/nation-emblems/natlan.png'
];
  var brandLogoImg = document.getElementById('brand-logo-img');
  var emblemIndex = 0;

  if (brandLogoImg) {
    setInterval(function () {
      emblemIndex = (emblemIndex + 1) % nationEmblems.length;
      brandLogoImg.style.opacity = 0;
      setTimeout(function () {
        brandLogoImg.src = nationEmblems[emblemIndex];
        brandLogoImg.style.opacity = 1;
      }, 150);
    }, 1000);
  }

  /* ---------------------------------------------------------------------- */
  /* Data                                                                    */
  /* ---------------------------------------------------------------------- */
  var platforms = ['PC', 'PlayStation', 'Mobile'];

  var nations = [
    { name: 'Mondstadt', mood: 'Wind & song', description: 'A city where the breeze carries music over the rooftops and freedom is a daily practice.' },
    { name: 'Liyue', mood: 'Stone & silk', description: 'A harbor of contracts, mountain paths, and lanterns that turn old promises into light.' },
    { name: 'Inazuma', mood: 'Thunder & stillness', description: 'Across the sea, a nation of islands holds its storms close and its stories closer.' },
    { name: 'Sumeru', mood: 'Dream & discovery', description: 'Wisdom grows in unexpected places where the forest remembers more than any library.' },
    { name: 'Fontaine', mood: 'Tide & invention', description: 'An electric shoreline of theater, invention, and questions that refuse to stay underwater.' },
    { name: 'Natlan', mood: 'Fire & soul', description: 'Land defined by martial honor, sacred fire, and vibrant tribal tradition.' },
    { name: 'Snezhnaya', mood: 'Ice & love', description: 'Primarily known as the home base of the Fatui.' },
  ];

  var mediaItems = [
    {
      id: 'lanterns',
      image: 'assets/jade-night.png',
      eyebrow: 'Cinematic preview',
      title: 'Welcome to somewhere new',
      shortCopy: 'The moment before every lantern becomes a star.',
      copy: 'The Cinematic Trailer of the current chapter in Genshin Impact version 7.0 - 7.1. As the welcome gifts of the cold region of Snezhnaya.',
      position: 'center',
      overlay: 'linear-gradient(160deg, rgba(20,46,75,.3), rgba(10,17,30,.92))'
    },
    {
      id: 'outfits',
      image: 'assets/img/flinsv2.png',
      eyebrow: 'Current Banner 1',
      title: 'Flins',
      shortCopy: 'The Lone Light Knocks at Night',
      copy: 'Festival clothes are more than color. They are a promise to meet the world with your best self, even when the path bends somewhere unfamiliar.',
      position: '71% center',
      overlay: 'linear-gradient(160deg, rgba(202,122,76,.22), rgba(15,22,35,.95))'
    },
    {
      id: 'teahouse',
      image: 'assets/img/ineffa2.png',
      eyebrow: 'Current Banner 2',
      title: 'Ineffa',
      shortCopy: 'Astral Actuation',
      copy: 'Between quests, there is tea. Between storms, there is a seat saved for you. Liyue has a way of making the distance feel like home.',
      position: '18% center',
      overlay: 'linear-gradient(160deg, rgba(62,118,125,.25), rgba(10,17,30,.95))'
    },
    {
      id: 'program',
      image: 'assets/img/genshin.jpg',
      eyebrow: 'Latest dispatch',
      title: 'The next chapter calls',
      shortCopy: 'A new horizon is already taking shape.',
      copy: 'The road through Teyvat never stays still. Gather your party, watch the horizon, and be ready for the stories waiting beyond the next mountain pass.',
      position: 'center',
      overlay: 'linear-gradient(160deg, rgba(104,36,46,.2), rgba(10,17,30,.95))'
    }
  ];

  var state = {
    mobileMenuOpen: false,
    downloadOpen: false,
    activeMediaId: 'lanterns',
    activeNation: 'Liyue',
    downloadedFor: null
  };

  /* ---------------------------------------------------------------------- */
  /* Mobile menu                                                             */
  /* ---------------------------------------------------------------------- */
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileToggle = document.getElementById('button-mobile-menu');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  function setMobileMenu(open) {
    state.mobileMenuOpen = open;
    mobileMenu.classList.toggle('hidden', !open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    iconMenu.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  }

  mobileToggle.addEventListener('click', function () {
    setMobileMenu(!state.mobileMenuOpen);
  });

  document.querySelectorAll('.mobile-close').forEach(function (el) {
    el.addEventListener('click', function () { setMobileMenu(false); });
  });

  document.getElementById('button-mobile-play').addEventListener('click', function () {
    setMobileMenu(false);
    openDownload();
  });

  /* ---------------------------------------------------------------------- */
  /* Download modal                                                          */
  /* ---------------------------------------------------------------------- */
  var modalBackdrop = document.getElementById('modal-backdrop');
  var modalPlatforms = document.getElementById('modal-platforms');
  var statusEl = document.getElementById('status-platform-ready');

  function renderPlatforms() {
    modalPlatforms.innerHTML = '';
    platforms.forEach(function (platform) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-platform-btn';
      btn.setAttribute('data-testid', 'button-platform-' + platform.toLowerCase());

      var isSelected = state.downloadedFor === platform;
      btn.innerHTML =
        '<span>' +
          '<span class="modal-platform-name">' + platform + '</span>' +
          '<span class="modal-platform-sub">Download invitation</span>' +
        '</span>' +
        (isSelected
          ? '<svg class="icon-17 modal-platform-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>'
          : '<svg class="icon-17 modal-platform-icon" viewBox="0 0 24 24"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg>');

      btn.addEventListener('click', function () {
        state.downloadedFor = platform;
        renderPlatforms();
        statusEl.textContent = 'Your ' + platform + ' invitation is ready. The harbor lights are waiting.';
        statusEl.classList.remove('hidden');
      });
      modalPlatforms.appendChild(btn);
    });
  }

  function openDownload() {
    state.downloadOpen = true;
    modalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDownload() {
    state.downloadOpen = false;
    modalBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  renderPlatforms();

  ['button-nav-play', 'button-hero-play', 'button-download-main', 'button-journal-enter'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', openDownload);
  });

  document.getElementById('button-close-platforms').addEventListener('click', closeDownload);

  modalBackdrop.addEventListener('mousedown', function (event) {
    if (event.target === modalBackdrop) closeDownload();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeDownload();
      setMobileMenu(false);
    }
  });

  /* ---------------------------------------------------------------------- */
  /* Nation selector                                                         */
  /* ---------------------------------------------------------------------- */
  var nationList = document.getElementById('nation-list');
  var activeNationName = document.getElementById('text-active-nation');
  var activeNationDesc = document.getElementById('text-active-desc');

  function renderNations() {
    nationList.innerHTML = '';
    nations.forEach(function (nation, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'destination-row';
      btn.setAttribute('data-active', String(state.activeNation === nation.name));
      btn.setAttribute('data-testid', 'button-nation-' + nation.name.toLowerCase());
      btn.innerHTML =
        '<span class="destination-row-left">' +
          '<span class="destination-num">0' + (index + 1) + '</span>' +
          '<span class="destination-dot"></span>' +
          '<span class="destination-name">' + nation.name + '</span>' +
        '</span>' +
        '<span class="destination-row-right">' +
          '<span class="destination-mood">' + nation.mood + '</span>' +
          '<svg class="icon-16 destination-chevron" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>' +
        '</span>';
      btn.addEventListener('click', function () {
        state.activeNation = nation.name;
        renderNations();
        updateActiveNationPanel();
      });
      nationList.appendChild(btn);
    });
  }

  function updateActiveNationPanel() {
    var nation = nations.find(function (n) { return n.name === state.activeNation; });
    activeNationName.textContent = nation.name;
    activeNationDesc.textContent = nation.description;
  }

  renderNations();
  updateActiveNationPanel();

  /* ---------------------------------------------------------------------- */
  /* Journal media gallery                                                   */
  /* ---------------------------------------------------------------------- */
  var mediaGrid = document.getElementById('media-grid');
  var selectedEyebrow = document.getElementById('text-selected-eyebrow');
  var selectedCopy = document.getElementById('text-selected-journal');

  function renderMedia() {
    mediaGrid.innerHTML = '';

    var lead = mediaItems[0];
    var leadCard = document.createElement('div');
    leadCard.className = 'media-card media-card--lead';
    leadCard.setAttribute('data-active', String(state.activeMediaId === lead.id));
    leadCard.setAttribute('data-testid', 'button-journal-' + lead.id);

    leadCard.innerHTML =
      '<div class="media-texture media-texture--video">' +
        // Removed autoplay so it stays paused on load
        '<video id="lead-video" src="assets/video/trailer.mp4" preload="metadata" playsinline></video>' +
      '</div>' +
      '<div class="media-overlay"></div>' +
      // Play / Pause button: starts with the Play icon
      '<button type="button" class="video-play-btn" id="button-video-toggle" aria-label="Play video">' +
        '<svg class="icon-play icon-16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>' +
        '<svg class="icon-pause icon-16 hidden" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>' +
      '</button>' +
      '<span class="media-lead-tag"><svg class="icon-13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg> Cinematic preview</span>' +
      '<div class="media-lead-body">' +
        '<h3 class="media-lead-title">Welcome to somewhere new</h3>' +
        '<p class="media-lead-copy">The Tsaritsa, the Archon of Love who "has no love left for her people".</p>' +
      '</div>' +
      '<button type="button" class="media-lead-arrow" aria-label="Select note">' +
        '<svg class="icon-16" viewBox="0 0 24 24"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg>' +
      '</button>';

    // Video play/pause logic
    var video = leadCard.querySelector('#lead-video');
    var toggleBtn = leadCard.querySelector('#button-video-toggle');
    var iconPlay = toggleBtn.querySelector('.icon-play');
    var iconPause = toggleBtn.querySelector('.icon-pause');

    function togglePlay(e) {
      e.stopPropagation();
      if (video.paused) {
        video.play();
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        toggleBtn.setAttribute('aria-label', 'Pause video');
      } else {
        video.pause();
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        toggleBtn.setAttribute('aria-label', 'Play video');
      }
    }

    toggleBtn.addEventListener('click', togglePlay);

    // If the video ends naturally, reset the icon back to Play
    video.addEventListener('ended', function () {
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
      toggleBtn.setAttribute('aria-label', 'Play video');
    });

    // Clicking the card body selects this journal note without toggling the video
    leadCard.addEventListener('click', function (e) {
      if (e.target.closest('#button-video-toggle')) return;
      selectMedia(lead.id);
    });

    mediaGrid.appendChild(leadCard);

    // The rest of your media cards
    mediaItems.slice(1).forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'media-card' + (item.id === 'program' ? ' media-card--full' : '');
      btn.setAttribute('data-active', String(state.activeMediaId === item.id));
      btn.setAttribute('data-testid', 'button-journal-' + item.id);
      btn.innerHTML =
        '<div class="media-texture" style="background-image:url(\'' + item.image + '\');background-position:' + item.position + ';"></div>' +
        '<div class="media-overlay" style="background:' + item.overlay + ';"></div>' +
        '<div class="media-card-body">' +
          '<div class="media-card-top">' +
            '<span class="media-card-eyebrow">' + item.eyebrow + '</span>' +
            '<svg class="icon-16" viewBox="0 0 24 24" style="color:#f2ead8;"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg>' +
          '</div>' +
          '<div>' +
            '<h3 class="media-card-title">' + item.title + '</h3>' +
            '<p class="media-card-copy">' + item.shortCopy + '</p>' +
          '</div>' +
        '</div>';
      btn.addEventListener('click', function () { selectMedia(item.id); });
      mediaGrid.appendChild(btn);
    });
  }

  function selectMedia(id) {
    state.activeMediaId = id;
    renderMedia();
    updateSelectedJournal();
  }

  function updateSelectedJournal() {
    var item = mediaItems.find(function (m) { return m.id === state.activeMediaId; }) || mediaItems[0];
    selectedEyebrow.textContent = 'Selected note / ' + item.eyebrow;
    selectedCopy.textContent = item.copy;
  }

  renderMedia();
  updateSelectedJournal();

  /* ---------------------------------------------------------------------- */
  /* Scroll reveal                                                           */
  /* ---------------------------------------------------------------------- */
  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }
})();