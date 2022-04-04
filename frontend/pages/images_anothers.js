import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import logo from "../public/vercel.svg";
import { signIn } from "../reducer/auth";
import userApi from "./api/userApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import link from "next/link";
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: "redirect",
//   signInSuccessUrl: "/",
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     //firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ],
// };
const Signin = (Props) => {
  const [ImagesAnother, SetImagesAnother] = useState([]);
  const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  //   const redirect = Props.location.search
  //     ? Props.location.search.split("=")[1]
  //     : "/profile";

  if (typeof window !== "undefined" && !Cookies.get("userInfor")) {
    router.push("/login");
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const temp1 = JSON.parse(Cookies.get("userInfor"));
      setUsername(temp1.username);
    }
  }, [username]);

  useEffect(async () => {
    if (username) {
      let listImagesAnother = await userApi.getImageAnotherUser(username);
      if (listImagesAnother) {
         
         SetImagesAnother(listImagesAnother);
      }
    }
  }, [username]);
  const downLoad = (item) => {
    // console.log(item.nameImage);

    const element = document.createElement("a");

    element.href = `http://localhost:5005/${item.linkImage}`;
    //URL.createObjectURL(file);
    element.download = item.nameImage;

    document.body.appendChild(element);
    element.click();
  };
    const logOut = () => {
      if (typeof window !== "undefined") {
        Cookies.remove("userInfor");
      }
    };
  return (
    <Container className="content">
     
      <Button onClick={() => logOut()}>Logout</Button>

      {ImagesAnother?.map((item, index) => {
        return (
          <Row>
            <div key={index} style={{ width: "100%" }}>
              <h2 style={{ "word-wrap": "break-word" }}>
                Username:{item.user}
              </h2>
              <h2 style={{ "word-wrap": "break-word" }}>
                RSAencodeKey:{item.RSAencodeKey}
              </h2>
              <h2 style={{ "word-wrap": "break-word" }}>n:{item.n}</h2>
              <CardGroup>
                {item?.images.map((item, index) => {
                  return (
                    <Col key={index}>
                      <Card>
                        <CardImg
                          alt="Card image cap"
                          src={`http://localhost:5005/${item.linkImage}`}
                          top
                          width="200px"
                          height="200px"
                        />
                        <CardBody>
                          <CardTitle tag="h5">{item.nameImage}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            Card subtitle
                          </CardSubtitle>
                          <CardText>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </CardText>
                          <Button onClick={() => downLoad(item)}>
                            tải ảnh
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
              </CardGroup>
            </div>
          </Row>
        );
      })}
      {/* {images?.map((item, index) => {
            return (
              <Col key={index}>
                <Card>
                  <CardImg
                    alt="Card image cap"
                    src={`http://localhost:5005/${item.linkImage}`}
                    top
                    width="200px"
                    height="200px"
                  />
                  <CardBody>
                    <CardTitle tag="h5">{item.nameImage}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Card subtitle
                    </CardSubtitle>
                    <CardText>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </CardText>
                    <Button onClick={() => downLoad(item)}>tải ảnh</Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })} */}
    </Container>
  );
};

export default Signin;
