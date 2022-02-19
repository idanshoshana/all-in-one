import * as vscode from "vscode";
import * as fs from "fs";   
//Create output channel
let orange = vscode.window.createOutputChannel("Orange");

//Write to output.

orange.appendLine("nad");




export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "allinone.folderWithAppropriateFiles",
    async (fileUri) => {
      
      const configuration = vscode.workspace.getConfiguration("allinone");
  
    




   const message= await vscode.window
    .showInformationMessage(
      "Create Folder or Files",
      ...["Folder", "Files"]
    )
    .then((answer) => {
      if (answer === "Folder") {
        // Run function
        orange.appendLine("nadav");
        return answer;
      }
      else{
        answer="Files"
        return answer;
      }
    });


       const folderName = await vscode.window.showInputBox();

		
      if ( fileUri &&message=="Files") {
        orange.appendLine(message);

        const folderPath = vscode.Uri.joinPath(fileUri);
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
      else if(folderName && fileUri)
      {
        orange.appendLine(message);

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

