FROM node:20-bookworm-slim

WORKDIR /app

# Install runtime system dependencies required by the downloader.
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg python3 python3-pip \
    && pip3 install --no-cache-dir yt-dlp \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
