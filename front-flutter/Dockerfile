FROM ubuntu:18.04
   
# Prerequisites
RUN apt update && apt install -y curl git unzip xz-utils zip libglu1-mesa openjdk-8-jdk wget
   
# Set up new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer
   
# Prepare Android directories and system variables
RUN mkdir -p Android/sdk
ENV ANDROID_SDK_ROOT /home/developer/Android/sdk
RUN mkdir -p .android && touch .android/repositories.cfg
   
# Set up Android SDK
RUN wget -O sdk-tools.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
RUN unzip sdk-tools.zip && rm sdk-tools.zip
RUN mv tools Android/sdk/tools
RUN cd Android/sdk/tools/bin && yes | ./sdkmanager --licenses
RUN cd Android/sdk/tools/bin && ./sdkmanager "build-tools;28.0.3" "patcher;v4" "platform-tools" "platforms;android-28" "sources;android-28"
RUN cd Android/sdk/tools/bin && ./sdkmanager "build-tools;29.0.3" "patcher;v4" "platform-tools" "platforms;android-29" "sources;android-29"
ENV PATH "$PATH:/home/developer/Android/sdk/platform-tools"

# Download Flutter SDK
RUN git clone --depth 1 --branch 1.22.5 https://github.com/flutter/flutter.git
ENV PATH "$PATH:/home/developer/flutter/bin"
   
# Run basic check to download Dark SDK
RUN flutter doctor


# Login as Root
USER root
WORKDIR /app

# Download and do pub get
COPY ./area/pubspec.yaml .
COPY ./area/pubspec.lock .
RUN flutter pub get

COPY ./area .

CMD [ "flutter", "build", "apk", "--split-per-abi" ]