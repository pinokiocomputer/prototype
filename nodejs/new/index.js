const fs = require('fs')
const path = require('path')
module.exports = {
  run: [
    {
      method: async (req, ondata, kernel) => {
        await fs.promises.cp(path.resolve(__dirname, "template"), req.cwd, { recursive: true })
        await fs.promises.cp(path.resolve(__dirname, "template/AGENTS.md"), path.resolve(req.cwd, "CLAUDE.md"))
        await fs.promises.cp(path.resolve(__dirname, "template/AGENTS.md"), path.resolve(req.cwd, "GEMINI.md"))
        await fs.promises.rename(path.resolve(req.cwd, "gitignore"), path.resolve(req.cwd, ".gitignore"))
        await kernel.bin.download(
          "https://raw.githubusercontent.com/pinokiocomputer/home/refs/heads/main/docs/README.md",
          path.resolve(req.cwd, "PINOKIO.md"),
          ondata
        )
        await kernel.exec({
          message: [
            "git init",
            "git add .",
            "git commit -am init"
          ],
          path: req.cwd
        }, (e) => {
          ondata(e) 
        })
      }
    }
  ]
}
