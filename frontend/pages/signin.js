import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import bigInt from "big-integer";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
} from "reactstrap";
// import logo from "../../assets/logo192.png";
import { signIn } from "../reducer/auth";
import loginApi from "./api/userApi";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { genKey } from "../components/RSA";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RSAPublicKey, setRSAPublicKey] = useState("");
  const [inforCypher, setInforCypher] = useState({ infor: null });
  const router = useRouter();
  const dispatch = useDispatch();
  const [a, seta] = useState();

  //   const redirect = Props.location.search
  //     ? Props.location.search.split("=")[1]
  //     : "/profile";

  const userInfor = useSelector((state) => state.auth.userInfor);

  const keygenSingn = () => {
    let temp = genKey();
    // console.log(temp);
    setInforCypher({
      infor: {
        ...temp,
      },
    });
  };

  const submit = async (infor) => {
    try {
      if (inforCypher.infor) {
        const data = await loginApi.registerUser({
          ...infor,
          RSAPublicKey: inforCypher.infor?.public_key,
          n: inforCypher.infor?.n,
        });

        // console.log(data);
        //console.log(localStorage.getItem('userInfor'));

        if (data) {
          Cookies.set("userInfor", JSON.stringify(data));
          dispatch(signIn());
          toast.success("register successfully!");
          router.push("/");
        } else {
          toast.error("register failed!");
        }
      } else {
        toast.warning("please genkey!");
      }
    } catch (error) {
      // console.log(error);
      toast.warning("Failed to signin: ", error);
    }
    //dispatch(signIn(infor));
  };
  return (
    <Container className="content">
      <ToastContainer />
      <Row>
        <Col sm={7}>
          <Button onClick={() => keygenSingn()}>
            {" "}
            <b>keyGen</b>
          </Button>{" "}
          <div>
            <h3 style={{ wordWrap: "break-word" }}>
              PrivateKey: {inforCypher.infor?.private_key}
            </h3>
            <h3 style={{ wordWrap: "break-word" }}>
              PublicKey:{inforCypher.infor?.public_key}
            </h3>
            <h3 style={{ wordWrap: "break-word" }}>
              {" "}
              n:{inforCypher.infor?.n}
            </h3>
          </div>
        </Col>

        <Col sm={5}>
          <div className="login">
            <div className="login-logo">
              {/* <img
                style={{ height: "5rem", width: "5rem" }}
                src={logo}
                alt="logo"
              /> */}
            </div>
            <h2>Register</h2>
            <hr />
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="exampleEmail"
                  placeholder="username"
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label for="exampleRSAPublicKey">RSA public key</Label>
                <Input
                  type="password"
                  name="rsapublickey"
                  id="exampleRSAPublicKey"
                  placeholder="RSA public key"
                  onChange={(event) => setRSAPublicKey(event.target.value)}
                />
              </FormGroup> */}
              <Button onClick={() => submit({ username, password })}>
                {" "}
                <b>Submit</b>
              </Button>{" "}
              {/* <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              /> */}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
