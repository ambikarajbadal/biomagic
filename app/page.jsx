import BioTemplates from "@components/BioTemplates";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Create & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        {" "}
        Biodata Magic: Create Your Happily Ever After!
      </span>
    </h1>
    <p className="desc text-center mb-10">
      Welcome to our Marriage Biodata Creator! Create a compelling profile to
      find your perfect match. Share your essential details, hobbies, and
      preferences. It's easy, secure, and a great way to connect with potential
      life partners. Start your journey to a happy and fulfilling marriage
      today!
    </p>

    {/*  <Feed /> */}
    <BioTemplates />
  </section>
);

export default Home;
