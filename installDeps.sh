export NODE_ENV=development 
npm ci
npm run build
rm -rf ./node_modules
export NODE_ENV=production 
npm ci --prod
git add node_modules
git commit -m "Add prod node modules"
git push -u origin master