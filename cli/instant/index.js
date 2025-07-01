const fs = require('fs')
const path = require('path')
module.exports = {
  run: [
    {
      method: "input",
      params: {
        title: "Command Launcher",
        form: [{
          title: "Enter the launch command",
          key: "start"
        }, {
          title: "Virtual environment",
          description: "optional. only for python based CLI apps.",
          key: "venv",
          type: 'checkbox',
        }]
      }
    },
    {
      method: async (req, ondata, kernel) => {
        await fs.promises.cp(path.resolve(__dirname, "template"), req.cwd, { recursive: true })
        await fs.promises.cp(path.resolve(__dirname, "template/AGENTS.md"), path.resolve(req.cwd, "CLAUDE.md"))
        await fs.promises.cp(path.resolve(__dirname, "template/AGENTS.md"), path.resolve(req.cwd, "GEMINI.md"))

        // start script
        let start = {
          run: [{
            method: "shell.run",
            params: {
              input: true,
              message: req.input.start
            }
          }]
        }
        if (req.input.venv) {
          start.run[0].params.venv = "venv"
        }
        await kernel.download(
          "https://raw.githubusercontent.com/pinokiocomputer/home/refs/heads/main/docs/README.md",
          path.resolve(req.cwd, "PINOKIO.md",
          ondata
        )
        await fs.promises.writeFile(path.resolve(req.cwd, "start.json"), JSON.stringify(start, null, 2))

        // git
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
      },
    }
  ]
}
