import React, { useEffect, useState } from "react";

const Item = () => {
  const [count, setCount] = useState(1);

  console.log("1");

  function Child({ count }) {
    useEffect(() => {
      console.log("3");
      return () => {
        console.log("4");
      };
    }, [count]);
  
    return null;
  }

  useEffect(() => {
    return () => {
      console.log("2");
    };
  }, [count]);

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return <Child count={count} />;
}



export default  Item