import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import CryptoJS from "crypto-js";

import bigInt from "big-integer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserApi from "./api/userApi";
// import readimage from "readimage";
import {
  Button,
 
  FormGroup,
  Label,
  Input,
  
  Container,
} from "reactstrap";
import {
 
  encrypt_RSA,
  ConvertFromStringToNumber,
  decrypt_RSA,
  ConvertFromNumberToString,
} from "../components/RSA";
export default function Home() {
  const [image, setImage] = useState({
    selectedFile: null,
  });
  const [binary, setBinary] = useState([]);
  const router = useRouter();
  const [user, setUser] = useState();
  const [showImage, setShowImage] = useState();
  const [privateRSAKey, setprivateRSAKey] = useState();
  const [ESAKey, setESAKey] = useState();
  const [encodeAnotherUser, setencodeAnotherUser] = useState();
  const [nAnotherUser, setNAnotherUser] = useState();
  const [anotherUser, setanotherUser] = useState();
  if (typeof window !== "undefined" && !Cookies.get("userInfor")) {
    router.push("/login");
  }
  if (typeof window !== "undefined") {
    const temp1 = Cookies.get("userInfor");
  }

  const handleprivateRSAKey = (event) => {
    setprivateRSAKey(event.target.value);
  };
  const handleEnCodeAnotherUser = (event) => {
    setencodeAnotherUser(event.target.value);
  };
  const handleNAnotherUser = (event) => {
    setNAnotherUser(event.target.value);
  };
  const AddUserHandle = (event) => {
    setanotherUser(event.target.value);
  };
  const addAESkey = (event) => {
    setESAKey(event.target.value);
  };
  const fileselectHandle = (event) => {
    setImage({
      selectedFile: event.target.files[0],
    });
  };
  const fileUploadHandle = async () => {
    const fd = new FormData();
    const data = JSON.parse(Cookies.get("userInfor"));

    fd.append("image", image.selectedFile, image.selectedFile.name);
    fd.append(
      "document",
      JSON.stringify({
        username: data.username,
        imageName: image.selectedFile.name,
      })
    );
    const temp = await axios
      .post("http://localhost:5005/uploadimage", fd)
      .then((res) => {
        toast.success("upload success!");
        setShowImage(res.data);
      });

    // const fd1 = new FormData();
    // console.log(fd1.getAll);
  };
  const readimage = async () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
      
        resolve(event.target.result.slice(22, event.target.result.length));
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(image.selectedFile);
      // console.log(Base64.fromUint8Array(binary));
    });
  };
  const fileUploadHandle1 = async () => {
 
    if (ESAKey?.length !== 16) {
      toast.warning("plAESe enter enough character AESkey");
      return;
    }
    var ciphertext = await readimage();

    ciphertext = CryptoJS.AES.encrypt(
      ciphertext,
      ConvertFromStringToNumber(ESAKey).toString()
    ).toString();
    // console.log(ciphertext);
    const element = document.createElement("a");
    element.href = `data:image/png;base64,${ciphertext}`;
    //URL.createObjectURL(file);
    element.download = image.selectedFile.name;
    document.body.appendChild(element);
    element.click();
  };

  const fileUploadHandle2 = async () => {
    if (ESAKey?.length !== 16) {
      toast.warning("plAESe enter enough character AESkey");
      return;
    }
    var ciphertext = await readimage();
  
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(
      ciphertext,
      ConvertFromStringToNumber(ESAKey).toString()
    );

    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    // console.log(originalText); // 'my message'
    setBinary(originalText);
   
    const element = document.createElement("a");
    element.href = `data:image/png;base64,${originalText}`;
    //URL.createObjectURL(file);
    element.download = image.selectedFile.name;
    document.body.appendChild(element);
    element.click();
  };
  const privateKeyEncoding = async () => {
    try {
      if (typeof window !== "undefined" && ESAKey) {
        if (ESAKey?.length !== 16) {
          toast.warning("plAESe enter enough character AESkey");
          return;
        }
        const temp = JSON.parse(Cookies.get("userInfor"));

        let key = encrypt_RSA(
          ConvertFromStringToNumber(ESAKey),
          bigInt(temp.publickey),
          bigInt(temp.n)
        );

        await UserApi.uploadkey({
          RSAencodeKey: key.toString(),
          username: temp.username,
        });
        toast.success("push key success!");
      }
    } catch (error) {
      toast.warning("push key failed!");
    }
  };
  const uploadUserSeeImages = async () => {
    if (typeof window !== "undefined" && anotherUser) {
      const temp = JSON.parse(Cookies.get("userInfor"));

      await UserApi.uploadAnotherUser({
        username: temp.username,
        user: anotherUser,
      });
    }
  };
  const decodePrivatekeyoAnotherUser = () => {
  
    if (encodeAnotherUser && privateRSAKey && nAnotherUser) {
      // console.log(
      //   ConvertFromNumberToString(
      //     bigInt(
      //     decrypt_RSA(
      //       bigInt(encodeAnotherUser),
      //       bigInt(privateRSAKey),
      //       bigInt(nAnotherUser)
      //     ).toString())
      //   )
      // );
      setESAKey(
        ConvertFromNumberToString(
          decrypt_RSA(
            bigInt(encodeAnotherUser),
            bigInt(privateRSAKey),
            bigInt(nAnotherUser)
          )
        )
      );
    } else {
      toast.warning("plAESe enter enough character endcode of another user");
      return;
    }
  };
  const logOut = () => {
    if (typeof window !== "undefined") {
      Cookies.remove("userInfor");
    }
  };
  return (
    <Container>
      <ToastContainer></ToastContainer>
      <Button onClick={() => logOut()}>Logout</Button>
      {/* <input type="file" onChange={(target) => fileselectHandle(target)} />
      <button onClick={() => fileUploadHandle()}>submit</button>
      <img
        style={{ width: "100px" }}
        src={`http://localhost:5000/${showImage}`}
      /> */}

      <FormGroup>
        <Label for="exampleFile">Upload image to server</Label>
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={(target) => fileselectHandle(target)}
        />

        <Button onClick={() => fileUploadHandle()}>submit</Button>
      </FormGroup>

      <FormGroup>
        <Label for="exampleFile">enter 16 character AESkey</Label>
        <Input
          type="text"
          name="text"
          id="exampleText"
          minLength="16"
          maxLength="16"
          value={ESAKey}
          onChange={(target) => addAESkey(target)}
        />
        <Label for="exampleFile">Image encoding</Label>
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={(target) => fileselectHandle(target)}
        />
        <Button onClick={() => fileUploadHandle1()}>submit</Button>
      </FormGroup>

      <FormGroup>
        <Label for="exampleFile">Image decoding</Label>
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={(target) => fileselectHandle(target)}
        />

        <Button onClick={() => fileUploadHandle2()}>submit</Button>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">
          AES: {ESAKey} encoding with publickey of server
        </Label>

        <Button onClick={() => privateKeyEncoding()}>submit</Button>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">add user can see your images</Label>
        <Input
          type="text"
          name="text"
          id="exampleText"
          onChange={(target) => AddUserHandle(target)}
        />

        <Button onClick={() => uploadUserSeeImages()}>submit</Button>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">enter code encode private</Label>
        <Input
          type="text"
          name="text"
          id="exampleText"
          onChange={(target) => handleEnCodeAnotherUser(target)}
        />
        <Label for="exampleFile">enter RSA privatekey </Label>
        <Input
          type="text"
          name="text"
          id="exampleText"
          onChange={(target) => handleprivateRSAKey(target)}
        />
        <Label for="exampleFile">enter N code </Label>
        <Input
          type="text"
          name="text"
          id="exampleText"
          onChange={(target) => handleNAnotherUser(target)}
        />

        <Button onClick={() => decodePrivatekeyoAnotherUser()}>submit</Button>
      </FormGroup>
    </Container>
  );
}
