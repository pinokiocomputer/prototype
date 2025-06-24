const fs = require('fs')
const path = require('path')
module.exports = {
  version: "4.0",
  type: "init",
  title: "installable command launcher",
  icon: "minimal.png",
  description: "create a launcher for ANY command, with an initial install step",
  run: [
    {
      method: "input",
      params: {
        title: "Installable Command Launcher",
        form: [{
          title: "Start command",
          key: "start"
        }, {
          title: "Install command",
          key: "install"
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

        // install script
        let install = {
          run: [{
            method: "shell.run",
            params: {
              message: req.input.install
            }
          }]
        }
        if (req.input.venv) {
          install.run[0].params.venv = "venv"
        }
        await fs.promises.writeFile(path.resolve(req.cwd, "install.json"), JSON.stringify(install, null, 2))

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
      }
    }
  ]
}
