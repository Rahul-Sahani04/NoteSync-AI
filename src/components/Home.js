import React, { useState } from "react";
import { Button as MUIButton, LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Alertss from "./Alertss";
import noteImg from "../images/Home.svg";
import Notes from "./Notes";

import Markdown from "react-markdown";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";

function Home() {
  const [response, setResponse] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const host = process.env.REACT_APP_API_URL;

  const handleAskGemini = async () => {
    if (!question) return;
    setLoading(true);

    setMessages([...messages, { type: "user", text: question }]);
    const res = await fetch(host + "/api/gemini/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setResponse(data.response);
    setMessages([
      ...messages,
      { type: "user", text: question },
      { type: "ai", text: data.response },
    ]);
    // setMessages([...messages, { type: "ai", text: data.response }]);
    setQuestion("");
    setLoading(false);
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <>
      <Navbar />
      <Alertss />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <h1
              data-aos="flip-up"
              data-aos-duration="800"
              data-aos-delay="100"
              className="display-1 pt-5 ps-5 respo"
            >
              <span style={{ color: "#9C27B0" }}>Note</span>Sync
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
              className="ps-5 respo"
              style={{ fontSize: "1.7rem", fontWeight: "bold" }}
            >
              Your notebook on cloud - safe and secure
            </p>
            <div
              className="d-flex justify-content-start"
              style={{ marginLeft: "45px", marginTop: "50px" }}
            >
              <MUIButton
                component={Link}
                to="/new"
                variant="contained"
                color="secondary"
                style={{
                  color: "White",
                  textTransform: "none",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.3rem",
                }}
              >
                Create New Note
              </MUIButton>

              <Drawer>
                <DrawerTrigger>
                  <MUIButton
                    variant="contained"
                    color="primary"
                    style={{
                      color: "White",
                      textTransform: "none",
                      fontFamily: "'Poppins', sans-serif'",
                      fontSize: "1.3rem",
                      marginLeft: "20px",
                    }}
                  >
                    Ask AI
                  </MUIButton>
                </DrawerTrigger>
                <DrawerContent className="bg-[#090E1A] text-white ">
                  <DrawerHeader className="text-white">
                    <DrawerTitle>Chat with AI</DrawerTitle>
                  </DrawerHeader>
                  <div
                    className="chat-container h-full"
                    style={{
                      padding: "20px",
                      height: "100%",
                      overflowY: "auto",
                      scrollbarColor: "#4B5563 #1F2937",
                      scrollbarWidth: "thin",
                    }}
                  >
                    <div className="chat-messages space-y-4">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={` chat-message ${msg.type}-message ${
                            (index + 1) % 2 === 0 &&
                            "border-b-2 border-white/50"
                          }`}
                        >
                          <p className="text-sm font-bold">
                            {msg.type === "ai" ? "AI" : "You"}
                          </p>
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DrawerFooter className="text-white  relative">
                    <LinearProgress
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        visibility: loading ? "visible" : "hidden",
                      }}
                    />
                    <Input
                      variant="outlined"
                      fullWidth
                      multiline
                      placeholder="Ask a question..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      style={{ backgroundColor: "#1C1C2D", color: "white" }}
                      InputProps={{
                        style: { color: "white" },
                      }}
                    />
                    <Button
                      onClick={handleAskGemini}
                      variant="secondary"
                      style={{
                        color: "white",
                        textTransform: "none",
                        fontFamily: "'Poppins', sans-serif'",
                        fontSize: "1.3rem",
                      }}
                    >
                      Send
                    </Button>
                  </DrawerFooter>
                  {/* <DrawerClose>
                    <Button variant="contained" className="mt-2">
                      Close
                    </Button>
                  </DrawerClose> */}
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <div className="col-md-7 d-flex flex-column align-items-center">
            <img
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
              className="img-fluid"
              style={{ width: "60%" }}
              src={noteImg}
              alt="NoteSync"
            />
          </div>
        </div>
        {chatVisible && (
          <div className="chat-panel">
            <h2>AI Chat</h2>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question or summarize your notes..."
              rows="4"
              cols="50"
            />
            <Button
              onClick={handleAskGemini}
              variant="contained"
              color="primary"
              style={{
                color: "White",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif'",
                fontSize: "1.3rem",
                marginTop: "10px",
              }}
            >
              Send
            </Button>
            <div className="response">
              <h3>Response:</h3>
              <p>{loading && "Loading..."}</p>
              <p>{response}</p>
            </div>
          </div>
        )}
        <Notes />
      </div>
    </>
  );
}

export default Home;
