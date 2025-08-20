import React from "react";

const PageLoader = () => {
  return (
    <body
      style={{
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "white",
      }}
    >
      <main>
        <div style={{ animation: "vanish 2s ease-out forwards" }}>
          <img src="/images/logo-black.svg" alt="matchmytees.com" />
        </div>
      </main>
    </body>
  );
};

export default PageLoader;
