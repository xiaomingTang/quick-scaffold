import path from "path"

const appRoot = path.resolve(__dirname, "../")

const Paths = {
  Root: appRoot,
  Src: path.resolve(appRoot, "src"),
  Comps: path.resolve(appRoot, "src/components"),
  Public: path.resolve(appRoot, "public"),
  DistUmd: path.resolve(appRoot, "dist/umd"),
  DistEsm: path.resolve(appRoot, "dist/esm"),
  DistExample: path.resolve(appRoot, "dist-examples"),
  Config: path.resolve(appRoot, "config"),
  NodeModule: path.resolve(appRoot, "node_modules"),
}

export default Paths
