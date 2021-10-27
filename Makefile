test:
	npm install
	npm run-script test
	npm run build-staging
	npm run build-production
	npm run manage:plugins:staging
	npm run manage:plugins:production
