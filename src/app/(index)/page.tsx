import About from "./About";
import GeminiAcknowlegement from "./Gemini";
import GetStarted from "./GetStarted";
import Header from "./Header";
import RecentStories from "./RecentStories";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <RecentStories />
      <GeminiAcknowlegement />
      <GetStarted />
    </>
  );
}
