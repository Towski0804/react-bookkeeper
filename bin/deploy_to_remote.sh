rm -rf dist
pnpm install
pnpm run build

tar -czvf dist.tar.gz dist 

scp ./dist.tar.gz gddUSW:/home/ubuntu/bookkeeper &&
rm -rf dist.tar.gz &&

ssh gddUSW sudo rm -rf /home/ubuntu/bookkeeper/dist &&
ssh gddUSW tar -xzvf /home/ubuntu/bookkeeper/dist.tar.gz -C /home/ubuntu/bookkeeper && 
ssh gddUSW sudo rm -rf /home/ubuntu/bookkeeper/dist.tar.gz