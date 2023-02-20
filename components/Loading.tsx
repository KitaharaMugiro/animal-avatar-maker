import React from "react";
import ReactLoading from "react-loading";

const Loading = ({}) => {

  if (true) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div>
          <ReactLoading
            type="spin"
            color="#ebc634"
            height="10px"
            width="10px"
            className="mx-auto"
          />
          <p className="text-center mt-3">aaaa</p>
        </div>
      </section>
    );
  }
};

export default Loading;