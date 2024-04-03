rm -rf dist
bun install
bun run build

tar -czvf dist.tar.gz dist 

scp ./dist.tar.gz gududuHK:/root/www/bkp &&
rm -rf dist.tar.gz &&

ssh gududuHK sudo rm -rf /root/www/bkp/dist &&
ssh gududuHK tar -xzvf /root/www/bkp/dist.tar.gz -C /root/www/bkp && 
ssh gududuHK sudo rm -rf /root/www/bkp/dist.tar.gz