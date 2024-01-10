clean:
	rm -f package-lock.json
	rm -f build/*
	rm -rf node_modules

package-lock.json:
	npm i --package-lock-only

node_modules: package-lock.json
	npm install
	touch node_modules

build-staging:
	npm run build-staging

build-production:
	npm run build-production

build: node_modules build-staging build-production
	git branch --show-current > build/revision.txt
	git describe --always >> build/revision.txt; git log -n 1 >> build/revision.txt

just_test:
	npm run-script test

test: build just_test
	# This is the target the CI uses, which is why it includes the build step too

prettier:
	npx prettier --write --print-width 120 .

sync_dev_files:
	test -n '$(DEV)' || exit 1
	fswatch -o build/ | while read n; do rsync -av --delete build/ eduid@eduid-developer-${DEV}-1.sunet.se:/opt/eduid/src/eduid-front/build/; done

translation:
	npm run translations:extract

.PHONY: clean build build-staging build-production test prettier sync_dev_files translation
