install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint . 

lint-fix:
	npx eslint . --fix

test: 
	npm run test

test-coverage:
	npm test -- --coverage

test-watch:
	npm test -- --watch