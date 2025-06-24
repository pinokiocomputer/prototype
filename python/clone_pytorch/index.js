const fs = require('fs')
const path = require('path')
module.exports = {
  run: [
    {
      method: "input",
      params: {
        title: "Git URL",
        description: "Enter a git URL to clone from",
        form: [{
          key: "url",
          title: "Git URL",
          placeholder: "Git URL (ex: https://github.com/cocktailpeanut/pinokio)",
          required: true
        }, {
          key: "launch_command",
          title: "Launch command",
          description: "The python launch command (ex: 'python app.py')",
          default: "python app.py",
          required: true
        }, {
          key: "launch_path",
          title: "Launch path",
          description: "The path from which to run the launch command (ex: 'app')",
          default: "app",
          required: true
        }, {
          key: "install_command",
          title: "Intall command",
          description: "The python launch command (ex: 'python app.py')",
          default: "uv pip install -r requirements.txt",
          required: true
        }, {
          key: "install_path",
          title: "Install cwd",
          description: "The path from which to run the install command (ex: 'app')",
          default: "app",
          required: true
        }]
      }
    },
    {
      method: async (req, ondata, kernel) => {
        /*
        req.input := {
          url,
          launch_command,
          launch_path,
          install_command,
          install_path
        }
        */
        console.log({ req })
        // 1. clone the template to the cwd
        let src = path.resolve(__dirname, "template")
        let dest = req.cwd
        ondata({
          raw: `\r\ncopying ${src} to ${dest}\r\n`
        })
        await fs.promises.cp(src, dest, { recursive: true })

        // 2. Store the input
        await fs.promises.writeFile(path.resolve(dest, "config.json"), JSON.stringify(req.input, null, 2))

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
