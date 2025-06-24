const config = require('./config.json')
module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          `git clone ${config.url} app`
        ],
      },
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          path: "app",
          venv: "venv",                // Edit this to customize the venv folder path
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",                // Edit this to customize the venv folder path
        path: `${config.install_path}`,
        message: [
          `${config.install_command}`,
        ],
      }
    },
  ]
}
