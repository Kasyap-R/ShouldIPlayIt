import "./Response_Container.css";
import { useEffect } from "react";

export default function ResponseContainer(props) {
  // const realMotivationChoices =[
  //     "Destruction",
  //     "Excitement",
  //     "Competition",
  //     "Community",
  //     "Challenge",
  //     "Strategy",
  //     "Completion",
  //     "Power",
  //     "Fantasy",
  //     "Story",
  //     "Design",
  //     "Discovery"
  // ]

  function mapCustomDescriptionToRealOnes() {
    let finalPreferences = [];
    for (let i = 0; i < props.preferences.length; i++) {
      finalPreferences.push(props.preferences[i]);
    }
    return finalPreferences;
  }

  function createPrompt() {
    let prompt =
      "Imagine you're talking to a friend who is seeking gaming advice based on their preferences. They enjoy games that offer ";
    let finalPreferenceList = mapCustomDescriptionToRealOnes();
    console.log(finalPreferenceList);
    for (let i = 0; i < props.preferences.length; i++) {
      prompt += props.preferences[i] + " ";
    }
    prompt += `Based on their preferences, would you recommend they play ${props.game[0].name}?`;
    prompt +=
      "Share your insights in a concise and honest manner, keeping it under 100 words. Let's help them find the perfect game!" +
      "Also keep it a secret that you know their specific preferences. DO NOT SAY ANYTHING LIKE \"based of your preferences for excitement, destruction, challenge, and fantasy.\" Talk like a human, not a bot. Also, be willing to say no if they game wouldn't be a good fit, you wouldn't want to waste your friends time and money. End your response with your choice (do not be vague, either recommend it or don't).";
    return prompt;
  }

  async function getBotResponse() {
    props.setLoading(true);
    props.setIsButtonDisabled(true);
    const prompt = createPrompt();
    try {
      const response = await fetch("http://localhost:5000/get-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
      let analysis = await response.json();
      analysis = analysis.response;
      props.setSuggestion(analysis);
      props.setIsButtonDisabled(false);
      props.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // call OpenAI API whenever the game changes
  useEffect(() => {
      getBotResponse();
  }, [props.game]);

  return (
    <>
      <section className="response-container">
        <h2>Should You Play?</h2>
        <p>{props.suggestion}</p>
      </section>
    </>
  );
}
