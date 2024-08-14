import { Pause, Play } from "./Player";
import { usePlayerStore } from "../store/playerStore";
import { useEffect, useState } from "react";
import { getAudioRef } from "../services/audioService";

export function CardPlayButton({ id, size = "small" }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
  const [audioRef, setAudioRef] = useState(null);
  useEffect(() => {
    const subscription = getAudioRef().subscribe((ref) => {
      setAudioRef(ref);
    });

    return () => subscription.unsubscribe();
  }, [isPlayingPlaylist]);

  useEffect(() => {
    isPlaying ? audioRef?.current.play() : audioRef?.current.pause();
  }, [isPlaying]);

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        const { song } = currentMusic;
        if (song) {
          const newSong = songs.find((s) => s.id === song.id);
          if (newSong) {
            setCurrentMusic({ songs, playlist, song: newSong });
            setIsPlaying(true);
            return;
          }
        }
        setIsPlaying(true);
        // Si encuentra la canción con el id, la reproduce; si no, reproduce la primera
        setCurrentMusic({ songs, playlist, song: songs[0] });
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}
