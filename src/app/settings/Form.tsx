"use client";

import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import { mutate } from "swr";

import { showToast } from "@/hooks/useToast";
import Img from "@/components/Img";
import { UploadIcon } from "@/components/Icons";
import { updateProfileAction } from "@/lib/actions/updateProfile";
import { validateUsername } from "../_lib/utils";

interface Profile {
  email: string;
  username: string;
  avatar: string;
  imgFile?: File;
  name: string;
  bio?: string;
}

export default function ProfileSettings({ data }: { data: Profile }) {
  const [profile, setProfile] = useState(data);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        setProfile((prev) => {
          return {
            ...prev,
            imgFile: files[0],
            avatar: URL.createObjectURL(files[0]),
          };
        });
      }
    } else {
      setProfile((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    const targetFile = e.dataTransfer.files;
    if (targetFile && targetFile[0]) {
      setProfile((prev) => {
        return {
          ...prev,
          avatar: URL.createObjectURL(targetFile[0]),
          imgFile: targetFile[0],
        };
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (profile.username.trim() && !validateUsername(profile.username)) {
      showToast({
        message: "Invalid Username",
        variants: "error",
      });
      setLoading(false);
      return;
    }

    const fields = ["username", "name"];

    let emptyFields = false;

    fields.forEach((field) => {
      const isEmptyInput =
        !profile[field as keyof Omit<Profile, "imgFile">]?.trim();

      if (isEmptyInput) {
        emptyFields = true;
        return;
      }
    });

    if (emptyFields) {
      showToast({
        message: "Username or name fields can't be empty",
        variants: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const { username, imgFile, name, bio } = profile;

      const updatePayload = {
        ...(username !== data.username && { username }),
        ...(imgFile && { imgFile }),
        ...(name !== data.name && { name }),
        ...(bio && { bio }),
      };

      const { success, message } = await updateProfileAction(updatePayload);

      showToast({
        message: message,
        variants: success ? "success" : "error",
      });

      if (success) {
       await mutate("/api/user/me");
        setProfile({ ...profile, imgFile: undefined });
      }

      return;
    } catch (error) {
      console.log("[PROFILE_SETTINGS_SUBMIT_ERROR]: ", error);

      showToast({
        variants: "error",
        message:
          error instanceof Error ? error.message : "Internal error, try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="xs:px-10 px-5 lg:px-20">
      <form
        onSubmit={handleSubmit}
        className="my-10 flex w-fit flex-1 flex-col gap-7 rounded-md"
      >
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Details</h1>
          <p className="text-gray-700 dark:text-secondary">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="bg-veryLightGray flex flex-col justify-items-start gap-10 rounded-md py-3 sm:flex-row sm:items-center sm:text-center md:text-left">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="bg-primary/10 border-primary/50 relative h-[190px] w-[190px] overflow-hidden rounded-md border-2 bg-cover bg-no-repeat"
          >
            {profile.avatar && (
              <Img
                src={profile.avatar}
                alt={profile.username}
                className="absolute inset-0 h-full w-full object-cover grayscale-100"
              />
            )}
            <label
              htmlFor="dropfile"
              className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3"
            >
              <div
                className={profile?.avatar ? "*:fill-white" : "*:fill-primary"}
              >
                <UploadIcon />
              </div>
              <p
                className={`text-purple font-semibold capitalize ${
                  profile?.avatar ? "text-white" : ""
                }`}
              >
                {profile?.avatar ? "change image" : "+ upload image"}
              </p>
              <input
                type="file"
                name=""
                id="dropfile"
                className="hidden"
                onChange={handleChange}
                accept="image/*"
              />
            </label>
          </div>

          <div className="grid gap-3">
            <p className="text-secondary/80">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>

            <p className="font-semibold">2mb max</p>
          </div>
        </div>
        <div className="grid gap-7.5 rounded-md md:w-[700px]">
          <div className="grid w-full grid-cols-1 items-center gap-10 sm:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-secondary text-sm font-bold"
              >
                Full Name
              </label>
              <input
                value={profile.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="border-secondary/50 text-secondary/90 focus:border-accent-blue rounded-lg border px-5 py-2.5 outline-none"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="username"
                className="text-secondary text-sm font-bold"
              >
                Username
              </label>
              <input
                value={profile.username}
                type="text"
                onChange={handleChange}
                name="username"
                className="border-secondary/50 text-secondary/90 focus:border-accent-blue rounded-lg border px-5 py-2.5 outline-none"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="name" className="text-secondary text-sm font-bold">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={handleChange}
              rows={5}
              name="bio"
              className="border-secondary/50 text-secondary/90 focus:border-accent-blue resize-none rounded-lg border px-5 py-2.5 outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-secondary text-sm font-bold">
              Email
            </label>
            <input
              value={profile.email}
              readOnly
              type="email"
              onChange={handleChange}
              name="email"
              className="border-secondary/50 text-secondary/90 focus:border-accent-blue read-only:bg-light-gray/10 read-only:cursor-not-allowed rounded-lg border px-5 py-2.5 outline-none read-only:opacity-70"
            />
          </div>
        </div>

        <hr className="border-accent-blue" />
        <button
          type="submit"
          className="border-primary bg-primary/80 w-fit rounded-md border-2 px-5 py-2 text-white disabled:cursor-not-allowed disabled:grayscale-100"
        >
          {loading ? "loading..." : "Save"}
        </button>
      </form>
    </div>
  );
}
