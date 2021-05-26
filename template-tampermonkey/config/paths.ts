import path from "path"

const appRoot = path.resolve(__dirname, "../")

function resolve(...p: string[]) {
  return path.resolve(appRoot, ...p)
}

const Paths = {
  Root: appRoot,
  Src: resolve("src"),
  Public: resolve("public"),
  Dist: resolve("dist"),
  Config: resolve("config"),
  NodeModule: resolve("node_modules"),
  resolve,
}

export default Paths
