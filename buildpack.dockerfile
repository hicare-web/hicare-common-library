FROM --platform=linux/amd64 buildpack-deps:focal

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    software-properties-common \
    git \
    cmake \
    ninja-build \
    vim \
    build-essential \
    llvm \
    clang

# install zig
COPY zig.tar.gz /zig.tar.gz
RUN tar -zxvf /zig.tar.gz && \
    mv zig /usr/local/bin/zig_llvm && \
    ln -s /usr/local/bin/zig_llvm/zig /usr/local/bin/zig && \
    rm /zig.tar.gz

RUN mkdir -p /macos-sdk/MacOSX14.0.sdk/ && \
    curl -L -O https://github.com/roblabla/MacOSX-SDKs/releases/download/macosx14.0/MacOSX14.0.sdk.tar.xz && \
    tar -xvf MacOSX14.0.sdk.tar.xz -C /macos-sdk/ && \
    export SDKROOT=/macos-sdk/MacOSX14.0.sdk/

ENV SDKROOT=/macos-sdk/MacOSX14.0.sdk/

# install rust
RUN wget https://static.rust-lang.org/rustup/archive/1.27.1/x86_64-unknown-linux-gnu/rustup-init && \
    chmod +x rustup-init && \
    ./rustup-init -y --default-toolchain 1.79.0 --default-host x86_64-unknown-linux-gnu --profile minimal && \
    . "$HOME/.cargo/env" && \
    rustup target add x86_64-unknown-linux-musl && \
    rustup target add aarch64-unknown-linux-gnu && \
    rustup target add aarch64-unknown-linux-musl && \
    rustup target add x86_64-pc-windows-gnu && \
    rustup target add x86_64-pc-windows-msvc && \
    rustup target add x86_64-apple-darwin && \
    rustup target add aarch64-apple-darwin && \
    cargo install cargo-xwin && \
    cargo install cargo-zigbuild

# install nvm
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  && \
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  && \
    nvm install 20 && \
    corepack enable && \
    corepack prepare pnpm@9.1.0 --activate

RUN rm -rf /var/cache/apt/archives/*
