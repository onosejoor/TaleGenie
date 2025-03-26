"use client";


import { showToast } from "@/hooks/useToast";
import { ChangeEvent, FormEvent, useState } from "react";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import { updateUsername } from "../../lib/actions/username";
import { validateUsername } from "../_lib/utils";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { LogoMobile } from "@/components/nav/Icons";

export default function CreateUsernameModal() {
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isDisabled = !username.trim();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!validateUsername(username)) {
      showToast({
        message: "Invalid Username",
        variants: "error",
      });
      setLoading(true);

      return;
    }

    try {
      const { success, message } = await updateUsername(username);

      showToast({
        message: message,
        variants: success ? "success" : "error",
      });

      if (success) {
        await mutate("/api/user/me");
        router.push(`/${username}`);
        setLoading(false);
      }
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : "Internal error",
        variants: "error",
      });
    }
    setLoading(false);
  }

  return (
    <div className="border-light-gray xs:w-[400px] dark:shadow-story-card-dark mx-auto my-10 grid h-fit w-full gap-5 overflow-hidden rounded-[10px] border-2 bg-white dark:border-transparent dark:bg-black">
      <form
        className="mx-auto grid h-fit w-full shrink-0 gap-10 px-5 py-10 sm:mx-0 sm:w-md sm:p-10 lg:w-full"
        onSubmit={handleSubmit}
      >
        <div className="*:my-5">
          <LogoMobile className="block h-[55px] dark:fill-white" />
          <div className="*:my-4">
            <h2 className="text-secondary text-4xl font-bold">
              Create Username
            </h2>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <label
              htmlFor="username"
              className="text-secondary text-sm font-bold"
            >
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              value={username}
              className="border-light-gray focus:border-accent-blue rounded-lg border px-5 py-2 outline-none"
            />
          </div>

          <button
            disabled={isDisabled || loading}
            className="bg-accent-blue hover:bg-accent-blue/70 w-full rounded-lg py-3 text-center font-semibold text-white disabled:!cursor-not-allowed disabled:opacity-70 disabled:grayscale-40"
          >
            {loading ? <ButtonLoader /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
