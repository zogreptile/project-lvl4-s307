install: install-deps

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

install-deps:
	npm install

build:
	rm -rf dist
	npm run build
	npx webpack -p --env production && babel frontend --out-dir dist --source-maps inline

lint:
	npx eslint .

publish:
	npm publish
