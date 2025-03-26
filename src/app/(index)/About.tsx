import Img from "@/components/Img";
import TitleHeader from "@/components/TitleHeader";

type Props = {
  title: string;
  text: string;
  alt: string;
  src: string;
};

const aboutData = [
  {
    title: "Personalized Tales",
    text: "Imagine stories made just for you! Tell TaleGenie a little bit about what you like, and it will weave amazing adventures that feel like they came straight from your dreams. It's like having a story that knows you!",
    alt: "image of a person holding a large book with hearts around",
    src: "/images/about-personalized-tales.svg",
  },
  {
    title: "Global Story Sharing",
    text: "Join a big group of story lovers from all around the world! Share your own stories, read stories from different countries, and make friends who love stories just as much as you do. It's a world of stories waiting to be explored!",
    alt: "image of a person using a smartphone with a large smartphone screen in the background",
    src: "/images/about-global-sharing.svg",
  },
  {
    title: "Learning Through Stories",
    text: "Stories can be fun and teach you new things! Dive into exciting tales that will take you to faraway lands and teach you amazing facts along the way. It's like learning while having a blast!",
    alt: "image of a person reading a book with a globe in the background",
    src: "/images/about-learning.svg",
  },
];

export default function About() {
  return (
    <section className="bg-secondary/5 py-10 px-10 md:px-20">
      <div className="grid gap-10">
        <TitleHeader text="About TaleGenie" />

        <div className="grid gap-7 md:gap-5">
          {aboutData.map((data, index) => (
            <AboutCard {...data} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const AboutCard = ({
  alt,
  src,
  text,
  title,
  index,
}: Props & { index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${!isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10`}
    >
      <div className="grid h-fit gap-5">
        <h3 className="text-primary font-cherry text-xl xs:text-2xl font-bold">{title}</h3>
        <p className="text-secondary xs:text-base text-xs lg:w-[90%]">{text}</p>
      </div>
      <Img alt={alt} src={src} className="h-full w-fit md:w-full md:max-h-[500px]" />
    </div>
  );
};

/**
 *     <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10`}>
      {isEven ? (
        <>
          <div className="gap-5 grid h-fit">
            <h3 className="text-primary font-cherry text-2xl font-bold">
              {title}
            </h3>
            <p className="text-secondary w-full md:w-[90%]">{text}</p>
          </div>
          <Img alt={alt} src={src} className="h-full w-full" />
        </>
      ) : (
        <>
          <Img alt={alt} src={src} className="h-full w-full" />
          <div className="gap-5 grid h-fit">
            <h3 className="text-primary font-cherry text-2xl font-bold">
              {title}
            </h3>
            <p className="text-secondary w-full md:w-[90%]">{text}</p>
          </div>
        </>
      )}
    </div>
 */
