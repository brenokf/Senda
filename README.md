<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e7603cd3-0526-4457-aa8b-572b0f3cbff0

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Configure your keys in `.env.local`:
   - `GEMINI_API_KEY` (AI reading interpretation + first image generation attempt)
   - `OPENAI_API_KEY` (GPT image generation fallback via backend proxy)
   - `HUGGINGFACE_API_KEY` (last fallback image generation)
3. Run the app:
   `npm run dev`

## Como funciona a geração de imagens

A aplicação agora tenta gerar as cartas com IA nesta ordem:

1. **Gemini** (`gemini-2.5-flash-image`) no frontend.
2. **GPT Image** (`gpt-image-1`) no backend (`/api/generate-image-gpt`).
3. **Hugging Face** (`stabilityai/stable-diffusion-xl-base-1.0`) como fallback final.

Se todos os serviços falharem, a app usa uma imagem placeholder para não quebrar o fluxo.
