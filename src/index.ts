import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  workspace,
} from 'coc.nvim';

import * as fs from 'fs';
import * as path from 'path';

//import * as tsVersion from './tsVersion';

import { DiagnosticModel, InitializationOptions } from '@volar/language-server';

let client: LanguageClient;
let serverModule: string;

export async function activate(context: ExtensionContext) {
  if (!workspace.getConfiguration('pug').get('enable')) return;

  const initializationOptions: InitializationOptions = {
    // **MEMO**:
    // In coc-pug, we decide to delegate the searching and detection of
    // typescript.tsdk and more to the language server on the server-side
    // instead of the client-side.
    //
    //typescript: tsVersion.getCurrentTsPaths(context),
    diagnosticModel: DiagnosticModel.Pull, // not matter because pug diagnostic is very fast
  };

  const devPugServerPath = workspace.expand(getConfigDevServerPath());
  if (devPugServerPath && fs.existsSync(devPugServerPath)) {
    serverModule = devPugServerPath;
  } else {
    serverModule = context.asAbsolutePath(
      path.join('node_modules', '@volar', 'pug-language-server', 'bin', 'pug-language-server.js')
    );
  }

  const runOptions = { execArgv: <string[]>[] };
  const debugOptions = { execArgv: ['--nolazy', '--inspect=' + 6009] };

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc, options: runOptions },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ language: 'jade' }],
    initializationOptions,
  };

  const client = new LanguageClient('pug', 'Pug', serverOptions, clientOptions);

  client.start();
}

export function deactivate(): Thenable<any> | undefined {
  return client?.stop();
}

function getConfigDevServerPath() {
  return workspace.getConfiguration('pug').get<string>('dev.serverPath', '');
}
