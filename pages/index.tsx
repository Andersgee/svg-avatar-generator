import type { NextPage } from "next";

import Avatar from "components/Avatar";

const Home: NextPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Avatar />
    </div>
  );
};

export default Home;
