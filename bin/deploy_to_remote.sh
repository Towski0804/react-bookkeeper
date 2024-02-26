rm -rf dist
pnpm install
pnpm run build

tar -czvf dist.tar.gz dist 

scp ./dist.tar.gz gddEC2:/home/ubuntu/bookkeeper &&
rm -rf dist.tar.gz &&

ssh gddEC2 tar -xzvf /home/ubuntu/bookkeeper/dist.tar.gz -C /home/ubuntu/bookkeeper && 
ssh gddEC2 rm -rf /home/ubuntu/bookkeeper/dist.tar.gz