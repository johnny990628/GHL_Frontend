FROM httpd:latest
MAINTAINER luckypig3400

# install app dependencies
# Build the app in host machine to reduce space usage in docker

# Set Work Directory
WORKDIR /usr/local/apache2

# install app
RUN rm -rf /usr/local/apache2/htdocs
COPY ./build ./htdocs

# final configuration
# httpd已提供EXPOSE 80port並自動啟動服務的設定
# 啟動container時記得設定port mapping為3000:80

# ------------------------------------
# 把image發佈到Docker Hub上的操作紀錄
# 先把local端的image用remote端命名並加上tag
# docker image tag ghl_frontend:latest kiwiteam/glc:ghl_frontend_latest
# docker image tag ghl_frontend:latest kiwiteam/glc:ghl_frontend_v1.0.0
# 最後把標上remote tag 的images push 到Docker Hub上
# docker image push --all-tags kiwiteam/glc
# ------------------------------------