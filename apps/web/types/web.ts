export type EnvironmentType = 'local' | 'alpha' | 'prod'

export type AdminType = 'internal' | 'external'
export type AdminSiteNameType = string

export type WebConfigType = {
  env: { [env in EnvironmentType]: { environmentName: string } }
  brand: {
    name: string
    desc: string
  }
  email: string
}
