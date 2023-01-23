REM  接著可以試著在這裡執行修改Local端.env的內容

cd ..
call npm install --force
call npm run build
REM 確保npm指令正常執行  https://stackoverflow.com/questions/42305275/creating-a-bat-file-with-npm-install-command

xcopy build "docker-test/build" /E/H/C/I/Y
REM https://www.ubackup.com/backup-restore/xcopy-command-to-copy-folders-and-subfolders-6688.html
cd docker-test
docker build -t ghl_frontend:latest . --no-cache
pause