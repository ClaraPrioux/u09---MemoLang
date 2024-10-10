const AboutPage = () => {
  return (
    <div className="flex flex-col m-10 sm:m-32 font-jost space-y-8 mt-2 sm:mt-6">
      <div className="flex flex-col sm:flex-row space-y-10 sm:space-x-16">
        <div className="flex flex-col space-y-12 sm:mt-6">
          <h2 className="text-white text-2xl font-bold drop-shadow-lg mt-4">
            How does MemoLang works?
          </h2>
          <p className="bg-white rounded border border-blueBorder shadow-lg p-4 w-#/4">
            MemoLang is based on the <strong>forgetting curve</strong>, but what
            is it? The forgetting curve is a psychological concept that
            describes how memory retention declines over time, showing that
            information is lost rapidly after learning...
          </p>
        </div>
        <img
          src="https://www.osmosis.org/_next/image?url=https%3A%2F%2Fd16qt3wv6xm098.cloudfront.net%2F--WD2D2kRNeq4CHothPq2OhfSCqmkmn5%2F_.jpg&w=3840&q=75"
          className="w-auto h-60 rounded border border-blueBorder shadow-lg"
        ></img>
      </div>
      <p className="bg-white rounded border border-blueBorder shadow-lg p-4">
        MemoLang wants to counter the forgetting curve, by reviewing the
        material at increasing intervals after the initial learning session, a
        technique known as <strong>spaced repetition</strong>. This method
        strengthens memory retention by reinforcing the information before it
        can be forgotten.
        <br />
        <br /> Limit yourself to learning no more than{" "}
        <strong>10 new words per day</strong>, while also reviewing past words,
        as consistent repetition is essential—though it requires significant
        daily effort.
      </p>
    </div>
  );
};

export default AboutPage;
