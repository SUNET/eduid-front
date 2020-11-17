test:
	npm install
	npm run-script test-headless
	npm run build
	npm run build-pro
	npm run manage:plugins:staging
	npm run manage:plugins:pro
