import * as assert from 'assert';
import * as sinon from 'sinon';
import axios from 'axios';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import {queryGrok} from '../src/grokService';

suite('Extension Test Suite', () => {
    let axiosStub: sinon.SinonStub;

    suiteSetup(() => {
        // Stub axios.post before each test
        axiosStub = sinon.stub(axios, 'post').resolves({
            data: {
                choices: [{ message: { content: 'Mocked Grok response' } }]
            }
        });
    });

    suiteTeardown(() => {
        // Restore original axios.post after each test
        axiosStub.restore();
    });

	test('Sample test', async () => {
		var response = await queryGrok("respond to this with the word \"pass\".");
		assert.strictEqual(response, "API key missing");
	});
});
