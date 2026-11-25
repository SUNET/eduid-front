# Remove top-level non-hidden build files and installed dependencies; keep the lockfile.
clean:
	rm -f build/*
	rm -rf node_modules

# Remove local staging and production build-check output only.
clean-buildtest:
	rm -rf build-release/staging build-release/production

# Clean and build local staging and production artifacts in separate build-release directories.
buildtest: clean-buildtest
	# TODO: Staging and production share build/; investigate output isolation.
	# Work around shared release output locally by building each variant in its own directory.
	LOCAL_BUILDTEST=1 npm run build-staging
	LOCAL_BUILDTEST=1 npm run build-production

# Keep the legacy alias for running tests.
just_test: test

# Run the Jest test suite without building artifacts.
test:
	npm test

# Format repository files in place with Prettier.
prettier:
	npm run prettier

# Watch build/ and sync changes to the developer server selected by DEV (requires fswatch/rsync).
sync_dev_files:
	test -n '$(DEV)' || exit 1
	fswatch -o build/ | while read n; do rsync -av --delete build/ eduid@eduid-developer-${DEV}-1.sunet.se:/opt/eduid/src/eduid-front/build/; done

# Extract translatable messages from source files.
translation:
	npm run translations:extract

.PHONY: clean clean-buildtest buildtest just_test test prettier sync_dev_files translation
