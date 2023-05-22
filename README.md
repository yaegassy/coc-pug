# coc-pug

> fork from a [vscode-pug](https://github.com/volarjs/pug-language-tools/tree/master/packages/vscode-pug)

[Pug Language Features](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-pug) for [coc.nvim](https://github.com/neoclide/coc.nvim)

## Install

**CocInstall**:

```
:CocInstall @yaegassy/coc-pug
```

**e.g. vim-plug**:

```vim
Plug 'yaegassy/coc-pug', {'do': 'yarn install --frozen-lockfile'}
```

## Note

### Filetype related

1. The "filetype" must be `pug` for this extension to work.

   Install "pug" related plugin. (e.g. [vim-pug](https://github.com/digitaltoad/vim-pug) or [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)).

2. You need to map the filetype `pug` to the languageId `jade`, set `g:coc_filetype_map` in `.vimrc/init.vim`.

   ```vim
   let g:coc_filetype_map = {
     \ 'pug': 'jade',
     \ }
   ```
   
## Configuration options

- `pug.enable`: Enable coc-pug extension, default: `true`
- `pug.trace.server`: Traces the communication between coc.nvim and the language server, valid option: `["off", "messages", "verbose"]`, default: `"off"`
- `pug.dev.serverPath`: (For develop and check) Custom path to pug server module, `~` and `$HOME`, etc. can also be used. If there is no setting, the built-in module will be used, default: `""`

## Thanks

- [volarjs/pug-language-tools](https://github.com/volarjs/pug-language-tools)

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
