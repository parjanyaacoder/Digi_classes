const fs =require( "fs")

const evalSourceMap =require( "react-dev-utils/evalSourceMapMiddleware")
const redirectServedPath =require( "react-dev-utils/redirectServedPathMiddleware")
const noopServiceWorker =require( "react-dev-utils/noopServiceWorkerMiddleware")

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  
  devServer: (devServerConfig, { env, paths }) => {
    devServerConfig = {
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined")
        }

        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app)
        }

        middlewares.push(
          evalSourceMap(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorker(paths.publicUrlOrPath)
        )

        return middlewares
      }
    }
    return devServerConfig
  }
  return config;
}