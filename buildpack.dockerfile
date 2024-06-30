FROM --platform=linux/amd64 buildpack-deps:focal

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/workspace/.cargo/bin:${PATH}"
ENV PNPM_HOME="/workspace/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SDKROOT=/workspace/macos-sdk/MacOSX14.0.sdk/
ENV NVM_DIR /workspace/.nvm

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -d /workspace \
    && chown -R $USERNAME:$USERNAME /workspace

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

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# install zig

COPY zig.tar.gz /tmp/zig.tar.gz
RUN tar -zxvf /tmp/zig.tar.gz && \
    mv zig /usr/local/bin/zig_llvm && \
    ln -s /usr/local/bin/zig_llvm/zig /usr/local/bin/zig && \
    rm /tmp/zig.tar.gz

RUN mkdir -p /workspace/.cargo/bin && \
    mkdir -p /workspace/pnpm/store && \
    mkdir -p /workspace/macos-sdk && \
    mkdir -p /workspace/.nvm && \
    mkdir -p /workspace/.cargo && \
    mkdir -p /workspace/.rustup && \
    mkdir -p /workspace/.rustup/toolchains && \
    chown $USERNAME:$USERNAME -R /workspace

# 사용자 변경
USER $USERNAME

WORKDIR /workspace

# install mac os sdk
RUN mkdir -p /workspace/macos-sdk/MacOSX14.0.sdk/ && \
    curl -L -O http://cloud.livteam.in/s/XqiXfnEeiL5wbHz/download/MacOSX14.0.sdk.tar.xz && \
    tar -xvf MacOSX14.0.sdk.tar.xz -C /workspace/macos-sdk/

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
    chmod +x /workspace/.nvm/nvm.sh && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install 20 && \
    corepack enable && \
    corepack prepare pnpm@9.1.0 --activate

# 환경 변수 설정
ENV PNPM_HOME /workspace/.local/share/pnpm
ENV PATH $PNPM_HOME:$PATH

# NVM과 pnpm 설정을 .bashrc에 추가
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> /workspace/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /workspace/.bashrc \
    && echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> /workspace/.bashrc \
    && echo 'export PNPM_HOME="/workspace/.local/share/pnpm"' >> /workspace/.bashrc \
    && echo 'export PATH="$PNPM_HOME:$PATH"' >> /workspace/.bashrc

RUN chown -R $USERNAME:$USERNAME /workspace

# 사용자 변경
USER $USERNAME

# Cargo 바이너리 캐시 디렉토리 생성
RUN mkdir -p /workspace/.cargo/bin

# PATH에 Cargo 바이너리 디렉토리 추가
ENV PATH="/workspace/.cargo/bin:${PATH}"

VOLUME /workspace