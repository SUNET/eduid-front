clean:
	rm -f package-lock.json
	rm -rf node_modules


package-lock.json: package.json
	npm install

node_modules: package-lock.json
	touch node_modules

build-staging:
	npm run build-staging
	npm run manage:plugins:staging

build-production:
	npm run build-production
	npm run manage:plugins:production

build: node_modules build-staging build-production

just_test:
	npm run-script test

test: build just_test
	# This is the target the CI uses, which is why it includes the build step too

prettier:
	npx prettier --write .

.PHONY: clean build build-staging build-production test prettier
