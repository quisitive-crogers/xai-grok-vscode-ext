import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import {queryGrok} from '../src/grokService';

suite('Extension Test Suite', () => {

	test('Sample test', async () => {
		var response = await queryGrok("respond to this with the word \"pass\".");
		assert.strictEqual(response, "API key missing");
	});
});
