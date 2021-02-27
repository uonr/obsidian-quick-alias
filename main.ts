import { Plugin, MarkdownView } from 'obsidian';

export default class AliasPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'add-alias',
			name: 'Add Alias',
			checkCallback: (checking: boolean) => {
				let view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!view) {
					return false;
				}
				if (!checking) {
					const editor = view.sourceMode.cmEditor;
					if (view.data.search(/^---\naliases:[\s\S]*\n---/) === -1) {
						editor.replaceRange("---\naliases:\n- \n---\n", { line: 0, ch: 0 });
						editor.setCursor({ line: 2, ch: 2 });
					} else {
						editor.replaceRange('- \n', { line: 2, ch: 0 });
						editor.setCursor({ line: 2, ch: 2 });
					}
				}
				return true;
			}
		});
	}

	onunload() {
	}
}
