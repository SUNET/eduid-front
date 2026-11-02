test:
	npm test

just_test: test

buildtest:
	# TODO: Staging and production share build/; investigate output isolation.
	# Work around shared release output locally by building each variant in its own directory.
	npm run clean-buildtest
	LOCAL_BUILDTEST=1 npm run build-staging
	LOCAL_BUILDTEST=1 npm run build-production

prettier:
	npm run prettier

sync_dev_files:
	test -n '$(DEV)' || exit 1
	fswatch -o build/ | while read n; do rsync -av --delete build/ eduid@eduid-developer-${DEV}-1.sunet.se:/opt/eduid/src/eduid-front/build/; done

translation:
	npm run translations:extract

.PHONY: just_test test buildtest prettier sync_dev_files translation
