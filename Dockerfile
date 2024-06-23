FROM hub.docker.rpm.hicare.net/napi-builder

# Copy the source code
COPY . /app

WORKDIR /app

# Install dependencies
RUN export NVM_DIR="$HOME/.nvm" && \
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  && \
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  && \
    corepack enable && \
    corepack prepare pnpm@9.1.0 --activate && \
    pnpm install

ENTRYPOINT ["tail", "-f", "/dev/null"]