const fs = require('fs')
const path = require('path')
module.exports = {
  run: [
//    {
//      method: "input",
//      params: {
//        title: "Prompt",
//        description: "Describe your project",
//        form: [{
//          type: "textarea",
//          key: "prompt"
//        }]
//      }
//    },
    {
      method: async (req, ondata, kernel) => {
        //config._basePath = req.input.paths[0]
        //await fs.promises.cp(path.resolve(__dirname, "template"), req.cwd, { recursive: true, force: true })
        //await fs.promises.writeFile(path.resolve(req.cwd, "docs/docsify.config.json"), JSON.stringify(config, null, 2))
        
        await fs.promises.cp(path.resolve(__dirname, "template"), req.cwd, { recursive: true, force: true })
        await fs.promises.cp(path.resolve(__dirname, "template/AGENTS.md"), path.resolve(req.cwd, "CLAUDE.md"))
        await fs.promises.rename(path.resolve(req.cwd, "gitignore"), path.resolve(req.cwd, ".gitignore"))

      },
//      next: null    // terminate
    },
    {
      method: "web.open",
      params: {
        uri: "{{cwd}}",
        type: "dev",
        target: "_top"
      }
    }
//    {
//      id: "git",
//      method: "input",
//      params: {
//        title: "Enter a git URL",
//        form: [{
//          title: "Git URL",
//          description: "Enter a Git URL to clone from",
//          key: "url",
//        }]
//      }
//    },
//    {
//      method: async (req, ondata, kernel) => {
//        // copy templates
//        await fs.promises.cp(path.resolve(__dirname, "template"), req.cwd, { recursive: true, force: true })
//
//        // clone into the docs folder
//        await kernel.exec({
//          message: `git clone ${req.input.url} repo`,
//          path: path.resolve(req.cwd, "docs")
//        }, ondata)
//
//      },
//      next: null,
//    },
  ]
}
