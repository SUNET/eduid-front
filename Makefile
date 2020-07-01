DOCSRC= doc

test:
	npm run test-headless

docs:
	plantuml -tsvg doc/*.md
