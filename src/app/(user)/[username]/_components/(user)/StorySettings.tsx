"use client";

import { useState } from "react";

import { CancelIcon, SettingsIcon } from "@/components/Icons";
import { showToast } from "@/hooks/useToast";
import {
  changeVisibilityAction,
  deleteStoryAction,
} from "@/lib/actions/stories";
import { KeyedMutator } from "swr";

export default function StorySettings({
  id,
  status,
  mutate,
}: {
  id: string;
  mutate: KeyedMutator<any>;
  status: Status;
}) {
  const [openSettings, setOpenSettings] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMenu = () => setOpenSettings(!openSettings);
  const closeMenuAndLoading = () => {
    setOpenSettings(false);
    setLoading(false);
  };

  const currentStatus = status === "published" ? "public" : "private";

  async function handleDeleteStory() {
    setLoading(true);
    const { success, message } = await deleteStoryAction(id);
    showToast({
      message,
      variants: success ? "success" : "error",
    });
    await mutate();
    closeMenuAndLoading();
    return;
  }

  async function handleChangeVisibility() {
    setLoading(true);

    const { success, message } = await changeVisibilityAction(id, status);
    showToast({
      message,
      variants: success ? "success" : "error",
    });
    await mutate();
    closeMenuAndLoading();

    return;
  }

  return (
    <div className="relative">
      <button onClick={handleMenu}>
        {openSettings ? (
          <CancelIcon fill="red" height={25} width={25} />
        ) : (
          <SettingsIcon />
        )}
      </button>

      {openSettings && (
        <div
          data-open={openSettings}
          className="shadow-settings dark:shadow-settings-dark divide-primary animate-in zoom-in-95 absolute top-10 right-full z-1 grid w-fit gap-2 divide-y rounded-md bg-white dark:bg-black/50 backdrop-blur-2xl py-3 duration-200 ease-out *:text-left sm:-left-[50px]"
        >
          <div className="pb-2">
            <button
              disabled={loading}
              onClick={handleChangeVisibility}
              className="hover:bg-light-gray/50 dark:hover:bg-secondary/20 grid w-full gap-1 px-4 py-2 disabled:!cursor-not-allowed"
            >
              <b className="text-secondary text-left text-base">Change visibility</b>
              <p className="text-secondary/70 text-xs whitespace-nowrap">
                Your story is currently {currentStatus}
              </p>
            </button>
          </div>

          <button
            onClick={handleDeleteStory}
            disabled={loading}
            className="hover:bg-light-gray/50 w-full px-4 py-2 whitespace-nowrap text-red-500 disabled:!cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
