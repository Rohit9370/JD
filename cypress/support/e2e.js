// You can add global Cypress configuration and behavior here
// This support file is processed and loaded automatically before your test files.

// Example: Fail test on console error (optional; comment out if noisy)
Cypress.on('window:before:load', (win) => {
  const origError = win.console.error
  win.console.error = (...args) => {
    origError(...args)
    throw new Error(args.join(' '))
  }
})
