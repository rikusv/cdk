import { readFileSync } from 'fs'

interface IAllEnvConfig {
  [stack: string]: {
    [name: string]: {
      [env: string]: string
    }
  }
}

interface IEnvConfig {
  [name: string]: string | null
}

const allEnvConfigRaw = readFileSync('env-config.json', 'utf-8')
const allEnvConfig: IAllEnvConfig = JSON.parse(allEnvConfigRaw)

export class EnvConfig {
  envConfig: IEnvConfig

  constructor(stack: string, env: string) {
    this.envConfig = {}
    Object.keys(allEnvConfig[stack]).forEach(name => {
      const node = allEnvConfig[stack][name]
      let value: string | null
      if (node.hasOwnProperty(env)) {
        value = node[env]
      } else if (node.hasOwnProperty('*')) {
        value = node['*']
      } else {
        value = null
      }
      this.envConfig[name] = value
    })
  }

  get(name: string): string | null {
    return this.envConfig[name]
  }
}
