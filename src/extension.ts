import * as vscode from 'vscode';
import { queryGrok } from './grokService';

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


export function deactivate() { }