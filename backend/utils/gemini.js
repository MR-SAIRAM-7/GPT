import dotenv from "dotenv";
dotenv.config();

const getGeminiResponse = async (req, res) => { 
    const { prompt } = req.body; 

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
                        parts: [{ text: prompt }], 
                    },
                ],
                generationConfig: {
                    thinkingConfig: {
                        include_thoughts: true, 
                    },
                },
            }),
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp:generateContent?key=${process.env.GEMINI_API_KEY}`, 
            options
        );

        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response found";

        res.json({
            response: aiText,
        });

    } catch (err) {
        console.error("Internal Server Error:", err);
        res.status(500).json({ error: "Gemini request failed" });
    }
};

export default getGeminiResponse;