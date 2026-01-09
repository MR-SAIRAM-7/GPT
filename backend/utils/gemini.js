import dotenv from "dotenv";
dotenv.config();


const getGeminiResponse = async (prompt) => {

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: prompt,
                    },
                ],
                generationConfig: {
                    thinkingConfig: {
                        thinkingLevel: "low",
                    },
                },
            }),
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`, options
        );

        const data = await response.json();
        console.log(data);
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        res.json({
            response: aiText,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Gemini request failed" });
    }

}

export default getGeminiResponse;