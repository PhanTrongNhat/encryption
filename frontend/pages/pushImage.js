import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
export default function Home() {
  const [image, setImage] = useState({
    selectedFile: null,
  });
  const router = useRouter();
  const [showImage, setShowImage] = useState();

  if (!Cookies.get("userInfor")) {
    router.push("/login");
  }
  const fileselectHandle = (event) => {
    setImage({
      selectedFile: event.target.files[0],
    });
  };
  const fileUploadHandle = async () => {
    const fd = new FormData();

    fd.append("image", image.selectedFile, image.selectedFile.name);

    await axios.post("http://localhost:5000/uploadimage", fd).then((res) => {
      setShowImage(res.data);
    });
  };
  function hexToBase64(str) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, "")
          .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
          .replace(/ +$/, "")
          .split(" ")
      )
    );
  }
    const logOut = () => {
      if (typeof window !== "undefined") {
        Cookies.remove("userInfor");
      }
    };
  return (
    <div>
      <Button onClick={() => logOut()}>Logout</Button>
      <input type="file" onChange={(target) => fileselectHandle(target)} />
      <button onClick={() => fileUploadHandle()}>submit</button>
      <img
        style={{ width: "100px" }}
        src={`http://localhost:5000/${showImage}`}
      />
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Plain Text (Static)</Label>
          <Input plaintext>Some plain text/ static value</Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleUrl">Url</Label>
          <Input
            type="url"
            name="url"
            id="exampleUrl"
            placeholder="url placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNumber">Number</Label>
          <Input
            type="number"
            name="number"
            id="exampleNumber"
            placeholder="number placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDatetime">Datetime</Label>
          <Input
            type="datetime"
            name="datetime"
            id="exampleDatetime"
            placeholder="datetime placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input
            type="time"
            name="time"
            id="exampleTime"
            placeholder="time placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleColor">Color</Label>
          <Input
            type="color"
            name="color"
            id="exampleColor"
            placeholder="color placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSearch">Search</Label>
          <Input
            type="search"
            name="search"
            id="exampleSearch"
            placeholder="search placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMulti">Select Multiple</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            multiple
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" /> Option one is this and that—be sure to
            include why it's great
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> Check me out
          </Label>
        </FormGroup>
      </Form>
    </div>
  );
}
