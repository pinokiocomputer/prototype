module.exports = {
  run: [
    {
      method: "input",
      params: {
        title: "Enter a Git URL",
        description: "Select a git url to clone from",
        form: [{
          key: "url",
          placeholder: "Git URL (ex: https://github.com/pinokiocomputer/pinokio)"
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git clone {{input.url}} app"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "npm install"
        ],
      }
    },
  ]
}
