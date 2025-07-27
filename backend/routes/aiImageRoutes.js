// import express from "express";
// import * as dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();
// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from DALL-E!" });
// });

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const aiResponse = await openai.images.generate({
//       model: "dall-e-2", // or "dall-e-3" if you want the latest model
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const base64 = aiResponse.data[0].b64_json;
//     const image = `data:image/png;base64,${base64}`;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error?.message || "Something went wrong" });
//   }
// });

// export default router;

import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";

dotenv.config();
const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const { prompt, width, height } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Default size if not provided
    const imgWidth = width || 512;
    const imgHeight = height || 512;

    const form = new FormData();
    form.append("prompt", prompt);
    form.append("output_format", "png");
    form.append("width", imgWidth);
    form.append("height", imgHeight);

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
        },
        timeout: 15000, // optional: 15 seconds timeout
      }
    );

    const base64 =
      response.data.image || response.data.artifacts?.[0]?.base64;

    if (!base64) {
      return res.status(500).json({ error: "No image data returned" });
    }

    const image = `data:image/png;base64,${base64}`;
    res.status(200).json({ photo: image });

  } catch (error) {
    console.error("Error from Stability API:", error?.response?.data || error.message);
    res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong while generating the image",
    });
  }
});

export default router;
