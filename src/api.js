// api.js
const apiURL = import.meta.env.VITE_REACT_API_URL;
const apiKey = import.meta.env.VITE_REACT_API_KEY;
const apiOrg = import.meta.env.VITE_REACT_API_ORG;
const apiModel = import.meta.env.VITE_REACT_API_MODEL;

export async function fetchChatGPTResponse(messages) {
  try {
    const response = await fetch(`${apiURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        organization: `${apiOrg}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You: Show me a recipe for " +
              items.join(", ") +
              " only. Strictly in markdown format.",
          },
          { role: "user", content: messages[0] },
        ],
        model: `${apiModel}`,
      }),
    });

    const data = await response.json();
    const message = data.choices[0]?.message?.content || "";
    return message.replace("AI:", "").trim();
  } catch (error) {
    throw error;
  }
}

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}
