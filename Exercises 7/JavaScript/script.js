const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

/*
This code creates a new instance of the Audio object,
which can be used to play audio files in the browser.
*/

const audio = new Audio();

/*
This code initializes the userData object with default values.
It sets the songs property to a copy of allSongs array,
the currentSong property to null,
and the songCurrentTime property to 0.
*/

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

/**
 * This code defines a function called playSong that takes an id parameter.
 * It finds the song object in the userData.songs array that matches the given id,
 * and sets the audio.src and audio.title properties to the song's source and title, respectively.
 * If the userData.currentSong property is null or does not match the song's id,
 * it sets the audio.currentTime property to 0.
 * Otherwise, it sets the audio.currentTime property to the userData.songCurrentTime value.
 * Finally, it sets the userData.currentSong property to the song object,
 * and adds the "playing" class to the playButton element.
 * It also calls the highlightCurrentSong, setPlayerDisplay, and setPlayButtonAccessibleText functions,
 * and starts playing the audio by calling the audio.play() method.
 *
 * @param {number} id - The id of the song to play.
 * @returns {void} - This function does not return any value.
 */

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

/**
 * This code defines a function called pauseSong that pauses the currently playing song.
 * It also saves the current playback time of the song to the userData.songCurrentTime property,
 * and removes the "playing" class from the playButton element.
 * @returns {void} - This function does not return any value.
 */

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

/**
 * This code defines a function called playNextSong that plays the next song in the user's playlist.
 * If there is no current song playing, it plays the first song in the playlist.
 * Otherwise, it finds the index of the current song in the playlist,
 * retrieves the next song using that index,
 * and plays it by calling the playSong function with the next song's id.
 * @returns {void} - This function does not return any value.
 */

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

/**
 * This code defines a function called playPreviousSong that plays the previous song in the user's playlist.
 * If there is no current song playing, the function simply returns without doing anything.
 * Otherwise, it finds the index of the current song in the playlist,
 * retrieves the previous song using that index,
 * and plays it by calling the playSong function with the previous song's id.
 * @returns {void} - This function does not return any value.
 */
const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

/**
 * This code defines a function called shuffle that shuffles the songs in the user's playlist randomly.
 * It uses the sort method with a random comparison function to rearrange the songs in a random order.
 * After shuffling, it resets the current song and playback time, updates the playlist display,
 * pauses any currently playing song, and updates the player display and play button accessible text.
 * @returns {void} - This function does not return any value.
 */
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

/**
 * This code defines a function called deleteSong that deletes a song from the user's playlist based on its id.
 * If the song being deleted is currently playing, it stops the playback and resets the current song and playback time.
 * After deleting the song, it updates the playlist display and highlights the current song if applicable.
 * Finally, it sets the accessible text for the play button.
 * 
 * @param {number} id - The id of the song to delete.
 * @returns {void} - This function does not return any value.
 
 */
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
};

/**
 * This code defines a function called setPlayerDisplay that updates the display of the currently playing song in the music player.
 * It selects the HTML elements with the IDs "player-song-title" and "player-song-artist",
 * and sets their text content to the title and artist of the current song stored in the userData object.
 * If there is no current song, it sets the text content to an empty string.
 * @returns {void} - This function does not return any value.
 * @example
 * setPlayerDisplay();
 * // This will update the player display with the current song's title and artist.
 */

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

/**
 * This code defines a function called highlightCurrentSong that highlights the currently playing song in the playlist.
 * It selects all elements with the class "playlist-song" and removes the "aria-current" attribute from each of them.
 * Then, it finds the element corresponding to the current song using its id and sets the "aria-current" attribute to "true".
 * This visually indicates which song is currently playing in the playlist.
 * @returns {void} - This function does not return any value.
 * @example
 * highlightCurrentSong();
 * // This will highlight the currently playing song in the playlist.
 */

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

/** 
 * This code defines a function called renderSongs that takes an array of song objects as a parameter.
It creates an HTML string that represents a list of playlist songs, 
and adds it to the playlist-songs element in the HTML document.
The function also calls the highlightCurrentSong and setPlayButtonAccessibleText functions.
  * @param {array} array - An array of song objects to be rendered in the playlist.
  * @returns {void} - This function does not return any value.
  * @example
  * const songs = [
  *   { id: 1, title: "Song 1", artist: "Artist 1", duration: "3:30" },
  *   { id: 2, title: "Song 2", artist: "Artist 2", duration: "4:15" },
  *   { id: 3, title: "Song 3", artist: "Artist 3", duration: "2:45" }
  * ];
  * renderSongs(songs);
  * // This will render the songs in the playlist-songs element.
*/

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick = "playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

/**
 * This code defines a function called getCurrentSongIndex that returns the index of the current song in the user's playlist.
 *  * @returns {number} The index of the current song in the user's playlist.
 *  * @example
 *  * const index = getCurrentSongIndex();
 *  * console.log(index); // Outputs the index of the current song
 */
const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

/**
 * This code defines a function called sortSongs that sorts the songs in the user's playlist alphabetically by title.
 * @returns {array} - Returns the sorted array of songs.
 */
const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());
