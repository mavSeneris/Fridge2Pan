// export async function getResponse(items) {
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer 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`,
//       organization: "2fIccQkIhVpzTF83cBXhZsHF",
//     },
//     body: JSON.stringify({
//       messages: [
//         {
//           role: "system",
//           content: "You: What can I cook with " + items.join(", ") + " only.",
//         },
//         { role: "user", content: "Suggest recipes" },
//       ],
//       model: "gpt-3.5-turbo",
//     }),
//   });

//   if (!response.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await response.json();
//   const message = data.choices[0]?.message?.content || "";
//   // setResponse(message.replace("AI:", "").trim());
//   return message.replace("AI:", "").trim();
// }
