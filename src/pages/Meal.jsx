import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarkdownView from "react-showdown";

export default function Meal() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateBack = useNavigate();

  const handleNavigateBack = () => {
    navigateBack(-1); // Navigate back to the previous link
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const messages = [
          {
            role: "system",
            content: "You: Give me a quick recipe for this time of day.",
          },
          {
            role: "user",
            content: "You: Give me a random recipe for this time of day strictly in markdown format..",
          },
        ];
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
              organization: "org-2fIccQkIhVpzTF83cBXhZsHF",
            },
            body: JSON.stringify({
              messages: messages,
              model: "gpt-3.5-turbo",
            }),
          }
        );
        const data = await response.json();
        console.log(data.choices[0].message.content);
        setResponse(data.choices[0].message.content);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-card">
        <div className="loading-text">
          <img
            src={
              "https://www.gstatic.com/android/keyboard/emojikitchen/20220815/u1f602/u1f602_u1f957.png"
            }
          />
          <h2>Searching Recipe...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-card">
        <div className="error-text">
          <img
            src={
              "https://www.gstatic.com/android/keyboard/emojikitchen/20220815/u1f97a/u1f97a_u1f957.png"
            }
          />
          <h3>Aww... No recipe found :( </h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {response && (
        <div className="meal-card">
          <span className="meal-back-to-home" onClick={handleNavigateBack}>
            &larr; Home
          </span>
          <h3>Try this one!</h3>
          <div className="meal-response">
            <MarkdownView
            className="markdown-component"
              markdown={response}
              options={{
                tables: true,
                emoji: true,

              }}
            />
            {/* <p>{response}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}
