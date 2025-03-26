"use client";

import { showToast } from "@/hooks/useToast";
import { ChangeEvent, FormEvent, useState } from "react";
import { scroller } from "react-scroll";

export default function ScrollToEpisode({ episodes }: { episodes: number }) {
  const [episode, setEpisode] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEpisode(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const episodeInNumber = parseInt(episode);

    if (episodeInNumber > episodes || episodeInNumber < 1) {
      showToast({
        variants: "error",
        message: "No Episode Found",
      });
      return;
    }

    scroller.scrollTo(`episode-${episode}`, {
      behaviour: "smooth",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Episode"
        className="border-primary dark:bg-black/70 dark:border-secondary w-[100px] rounded-[10px] border-2 p-3 py-2 outline-0"
        value={episode}
        onChange={handleChange}
      />
    </form>
  );
}
