import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Biodata Magic!",
  description:
    "Create a stunning bio data for free with Bio Magic – Your go-to platform for crafting professional and personalized biodatas. Effortlessly design and showcase your achievements, skills, and experiences. Start building your bio data today and leave a lasting impression!",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
