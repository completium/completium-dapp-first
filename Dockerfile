FROM gitpod/workspace-full:latest
LABEL maintainer="contact@edukera.com"
RUN sudo apt-get update && sudo apt-get -y install wget netbase
RUN wget -q https://raw.githubusercontent.com/edukera/completium-dapp-utils/master/admin.json
