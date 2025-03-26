import Img from "@/components/Img";

const GeminiAcknowlegement = () => (
  <section className="grid gap-10 justify-items-center">
    <a href="https://gemini.google.com/">
      <Img
        src={"/images/gemini.svg"}
        height={150}
        width={150}
        alt="gemini logo"
      />
    </a>

    <b className="text-xl text-secondary">Powered By Google Gemini</b>
  </section>
);

export default GeminiAcknowlegement;
