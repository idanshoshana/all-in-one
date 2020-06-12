import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "allinone.folderWithAppropriateFiles",
    async (fileUri) => {
      const configuration = vscode.workspace.getConfiguration("allinone");	  
	  const folderName = await vscode.window.showInputBox();
		
      if (folderName && fileUri) {
        const folderPath = vscode.Uri.joinPath(fileUri, folderName);
		await vscode.workspace.fs.createDirectory(folderPath);
		
        const workspaceEdit = new vscode.WorkspaceEdit();
        const extensions = configuration.get("fileExtensions");
        if (Array.isArray(extensions) && extensions.length > 0) {
          extensions.forEach((ext) => {
            workspaceEdit.createFile(
              vscode.Uri.joinPath(folderPath, `${folderName}.${ext}`)
            );
		  });
		  await vscode.workspace.applyEdit(workspaceEdit);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
