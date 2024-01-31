import Web3 from "web3";
import React, { useState, useEffect } from "react";
import simpleStorage from "./contracts/simpleStorage.json";
import "./App.css";

function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState("");
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = simpleStorage.networks[networkId];
      console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        simpleStorage.abi,
        deployedNetwork.address
      );
      // console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);
  // console.log("handlestate", state);

  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const newData = await contract.methods.retrieve().call();
      setData((newData) => newData);
      console.log("State updated:", newData);
      console.log("Component rendered:", data);
    }
    contract && readData();
  }, [state]);

  async function writeData() {
    const { contract } = state;
    const inputData = document.querySelector("#value").value;
    await contract.methods
      .store(inputData)
      .send({ from: "0xb1F5dC80395Ae53552Efc77592b8c05cfCF0d74a" });

    window.location.reload();
  }
  return (
    <>
      <h1>Deployed using truffle</h1>
      <div className="App">
        <h2>Contract Data is : {data} </h2>
        <input type="text" id="value"></input>
        <button onClick={writeData}>change data</button>
      </div>
    </>
  );
}

export default App;

// import React, { useState } from "react";

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }aw thay che run barobar aa normal che counter + krvano pelama te kaik bau nani mistake kri che

// export default Example;
