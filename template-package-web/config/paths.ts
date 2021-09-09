import path from "path"

const appRoot = path.resolve(__dirname, "../")

const Paths = {
  Root: appRoot,
  Src: path.resolve(appRoot, "src"),
  Examples: path.resolve(appRoot, "examples"),
  Public: path.resolve(appRoot, "public"),
  DistUmd: path.resolve(appRoot, "dist/umd"),
  DistCjs: path.resolve(appRoot, "dist/cjs"),
  DistEsm: path.resolve(appRoot, "dist/esm"),
  DistExample: path.resolve(appRoot, "dist-examples"),
  Config: path.resolve(appRoot, "config"),
  NodeModule: path.resolve(appRoot, "node_modules"),
}

export default Paths
