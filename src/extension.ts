import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
	// Command: Ask Grok with selected text or input
	let askGrok = vscode.commands.registerCommand('grok.ask', async () => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		const text = editor?.document.getText(selection) || await vscode.window.showInputBox({ prompt: 'Ask Grok:' }) || '';

		if (!text) {
			vscode.window.showErrorMessage('No text provided!');
			return;
		}

		const response = await queryGrok(text);
		vscode.window.showInformationMessage(`Grok says: ${response}`);
	});

	// Command: Paste and ask
	let pasteAndAsk = vscode.commands.registerCommand('grok.pasteAndAsk', async () => {
		const input = await vscode.window.showInputBox({ prompt: 'Paste code to ask Grok about:' });
		if (!input) { return; }

		const response = await queryGrok(input);
		vscode.window.showInformationMessage(`Grok says: ${response}`);
	});

	context.subscriptions.push(askGrok, pasteAndAsk);
}

async function queryGrok(input: string): Promise<string> {
	const apiKey = vscode.workspace.getConfiguration().get('grok.apiKey') as string;
	if (!apiKey) {
		vscode.window.showErrorMessage('Set your Grok API key in VS Code settings!');
		return 'API key missing';
	}

	try {
		const response = await axios.post(
			'https://api.x.ai/v1/chat/completions', // Placeholder—check xAI docs
			{
				model: 'grok-2', // Or 'grok-3' if available
				messages: [{ role: 'user', content: input }]
			},
			{ headers: { Authorization: `Bearer ${apiKey}` } }
		);
		return response.data.choices[0].message.content;
	} catch (error) {
		console.error(error);
		return 'Error querying Grok';
	}
}

export function deactivate() { }