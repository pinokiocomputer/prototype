const fs = require('fs')
const path = require('path')
module.exports = {
  version: "4.0",
  type: "init",
  title: "New Python Project",
  icon: "python.png",
  description: "create a python project",
  run: [{
    method: async (req, ondata, kernel) => {
      console.log({ req })
      let src = path.resolve(__dirname, "template")
      let dest = req.cwd
      ondata({
        raw: `\r\ncopying ${src} to ${dest}\r\n`
      })
      await fs.promises.cp(src, dest, { recursive: true })

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
  }]
}
