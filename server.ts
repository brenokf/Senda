import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Hugging Face API Proxy (Fallback)
  app.post("/api/generate-image-fallback", async (req, res) => {
    const { prompt } = req.body;
    const hfKey = process.env.HUGGINGFACE_API_KEY;

    if (!hfKey) {
      return res.status(500).json({ error: "HUGGINGFACE_API_KEY not configured" });
    }

    try {
      // Switching to a more free-tier friendly model to avoid 402 (Payment Required) errors
      const model = "stabilityai/stable-diffusion-xl-base-1.0";
      const hfUrl = `https://router.huggingface.co/hf-inference/models/${model}`;
      
      let retries = 0;
      const maxRetries = 5;
      
      while (retries < maxRetries) {
        const response = await fetch(hfUrl, {
          headers: { 
            Authorization: `Bearer ${hfKey}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        });

        if (response.status === 503) {
          const data = await response.json();
          const waitTime = (data.estimated_time || 20) * 1000;
          console.log(`Hugging Face model loading, waiting ${waitTime/1000}s...`);
          await new Promise(r => setTimeout(r, waitTime));
          retries++;
          continue;
        }

        if (response.status === 429) {
          // Rate limit on HF
          console.warn("Hugging Face rate limit hit, waiting 10s...");
          await new Promise(r => setTimeout(r, 10000));
          retries++;
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return res.json({ imageUrl: `data:image/png;base64,${base64}` });
      }
      
      res.status(504).json({ error: "Hugging Face timeout" });
    } catch (error: any) {
      console.error("Hugging Face API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Leonardo API Proxy
  app.post("/api/generate-image", async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.LEONARDO_API_KEY || "c1a7e616-0e9a-4c97-bf2f-5247f320778c";

    try {
      // 1. Start generation
      const genResponse = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          prompt,
          modelId: "5c232a9e-9061-4777-980a-ddc7e656cb99", // Leonardo Vision XL
          width: 768,
          height: 1024,
          num_images: 1
        })
      });

      if (!genResponse.ok) {
        const errorText = await genResponse.text();
        console.error(`Leonardo API Start Error (${genResponse.status}):`, errorText);
        throw new Error(`Leonardo API returned ${genResponse.status}: ${errorText}`);
      }

      const genData = await genResponse.json();
      if (!genData.sdGenerationJob) {
        console.error("Leonardo API Unexpected Response:", genData);
        throw new Error(genData.message || "Failed to start generation - no job ID returned");
      }

      const generationId = genData.sdGenerationJob.generationId;

      // 2. Poll for result
      let imageUrl = null;
      let attempts = 0;
      const maxAttempts = 20;

      while (!imageUrl && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const pollResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Accept": "application/json"
          }
        });

        const pollData = await pollResponse.json();
        const images = pollData.generations_by_pk?.generated_images || 
                       pollData.generations?.generated_images; // Alternative path

        if (images && images.length > 0) {
          imageUrl = images[0].url;
        }
        attempts++;
      }

      if (imageUrl) {
        res.json({ imageUrl });
      } else {
        res.status(500).json({ error: "Generation timed out" });
      }
    } catch (error: any) {
      console.error("Leonardo API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
