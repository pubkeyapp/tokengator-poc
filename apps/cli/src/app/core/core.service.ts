import { Injectable } from '@nestjs/common'
import { getKeypairFromFile } from '@solana-developers/helpers'
import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js'
import { getPresetsWithFeePayer } from '@tokengator/presets'
import * as pc from 'picocolors'
import { LogService } from './log.service'

@Injectable()
export class CoreService {
  cluster: CoreCluster
  private endpoint: string
  constructor(readonly logger: LogService) {}

  async getFeePayer() {
    return await getKeypairFromFile()
  }
  async getPresets() {
    const feePayer = await this.getFeePayer()

    return getPresetsWithFeePayer(feePayer)
  }

  async getPreset(id: string) {
    const presets = await this.getPresets()

    return presets.find((p) => p.id === id)
  }

  setCluster(cluster: CoreCluster) {
    this.cluster = cluster
    this.endpoint = getClusterEndpoint(cluster)
    this.logger.log(pc.white(`Cluster: ${cluster} ${this.endpoint !== cluster ? `(${this.endpoint})` : ''}`))
  }

  getExplorerUrl(path: string) {
    return getExplorerUrl(this.cluster ?? 'local', path)
  }

  getConnection(): Connection {
    if (!this.endpoint) {
      this.setCluster('local')
    }
    return new Connection(this.endpoint, 'confirmed')
  }

  async ensureConnection() {
    const conn = this.getConnection()
    try {
      const version = await conn.getVersion()
      this.logger.log(pc.green(`Connected to Solana version ${pc.bold(version['solana-core'])}`))
    } catch (e) {
      this.logger.error(pc.red(`Error connecting to the RPC endpoint: ${e.toString()}`))
    }
    return conn
  }
}

function getClusterEndpoint(url: CoreCluster) {
  switch (url) {
    case 'd':
    case 'devnet':
      return clusterApiUrl('devnet')
    case 't':
    case 'testnet':
      return clusterApiUrl('testnet')
    case 'm':
    case 'mainnet':
    case 'mainnet-beta':
      return clusterApiUrl('mainnet-beta')
    case 'l':
    case 'local':
      return 'http://localhost:8899'
    default:
      if (typeof url === 'string' && url.startsWith('http')) {
        return url
      }
      throw new Error(`Unknown URL: ${url}`)
  }
}

export type CoreCluster = Cluster | 'local' | 'mainnet' | string

function getExplorerUrl(cluster: CoreCluster, path: string) {
  const suffix = getExplorerSuffix(cluster)
  const base = `https://solana.fm/{path}${suffix}`

  return base.replace('{path}', path)
}

function getExplorerSuffix(cluster: CoreCluster) {
  switch (cluster) {
    case 'd':
    case 'devnet':
    case 't':
    case 'testnet':
      return `?cluster=${cluster}-solana`
    case 'm':
    case 'mainnet':
    case 'mainnet-beta':
      return ''
    case 'l':
    case 'local':
      return customSuffix('http://localhost:8899')
    default:
      if (typeof cluster === 'string' && cluster.startsWith('http')) {
        return customSuffix(cluster)
      }
      throw new Error(`Unknown URL: ${cluster}`)
  }
}

function customSuffix(cluster: string) {
  return `?cluster=localnet-solana&customUrl=${encodeURI(cluster)}`
}
