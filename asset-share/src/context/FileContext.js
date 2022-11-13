import React, { useState, useEffect } from "react";
import { connectWallet, connectWithContract } from "../api";
import axios from "axios";
export const FileAppContext = React.createContext();
export const FileAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [myFiles, setMyFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("");
  const createAUser = async () => {
    const contract = await connectWithContract();
    try {
      const keys = await axios.get("http://localhost:3001/api/getPubPriKey");
      console.log(keys.data);
      const user = await contract.createUser(
        keys.data.public_key,
        keys.data.private_key
      );
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  const getPublicKey = async () => {
    const contract = await connectWithContract();
    try {
      const key = await contract.getPublicKey();
      console.log(key);
      setPublicKey(key);
    } catch (e) {
      console.log(e);
    }
  };

  const getPrivateKey = async () => {
    const contract = await connectWithContract();
    try {
      const key = await contract.getPrivateKey();
      console.log(key);
      setPrivateKey(key);
    } catch (e) {
      console.log(e);
    }
  };

  const decryptText = async (hashes) => {
    hashes.forEach(async (hash) => {
      console.log(hash.hash);
      console.log(privateKey);
      const text = await axios.post(
        "http://localhost:3001/api/getDecryptedText",
        {
          hash: hash.hash,
          private_key: privateKey,
        }
      );
      console.log(text);
      if (text.data.access) {
        setReceivedFiles((receivedFiles) => [
          ...receivedFiles,
          {
            hash: text.data.message,
            name: hash.fileName,
            desc: hash.description,
            senderName: hash.senderName,
          },
        ]);
      }
      console.log(...receivedFiles);
    });
    console.log("Hello");
    return [];
  };

  const getReceivedFiles = async () => {
    const contract = await connectWithContract();
    try {
      const files = await contract.getReceivedFiles();
      console.log(files);

      let hashes = await decryptText(files);
    } catch (e) {
      console.log(e);
    }
  };

  const connection = async () => {
    console.log("Hello");
    try {
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FileAppContext.Provider
      value={{
        account,
        connection,
        createAUser,
        getPublicKey,
        getReceivedFiles,
        getPrivateKey,
        publicKey,
        privateKey,
        receivedFiles,
      }}
    >
      {children}
    </FileAppContext.Provider>
  );
};
