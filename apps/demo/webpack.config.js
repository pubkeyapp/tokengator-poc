const { composePlugins, withNx } = require('@nx/webpack')
const { withReact } = require('@nx/react')

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact({
    // Uncomment this line if you don't want to use SVGR
    // See: https://react-svgr.com/
    // svgr: false
  }),
  (config) => {
    config.ignoreWarnings = [/Failed to parse source map/]
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    }
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return config
  },
)
