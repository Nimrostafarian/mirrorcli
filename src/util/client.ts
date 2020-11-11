import { Mirror } from '@mirror-protocol/mirror.js';
import { CLIKey, LCDClient } from '@terra-money/terra.js';
import * as _ from 'lodash';

import { config } from './config';

export function getLCDClient(): LCDClient {
  return new LCDClient({
    chainID: config.lcd.chainId,
    URL: config.lcd.url,
    gasPrices: config.lcd.gasPrices,
    gasAdjustment: config.lcd.gasAdjustment,
  });
}

export function getMirrorClient(keyName?: string, home?: string): Mirror {
  return new Mirror({
    lcd: getLCDClient(),
    key: keyName ? new CLIKey({ keyName, home }) : undefined,
    collector: config.contracts.collector,
    factory: config.contracts.factory,
    gov: config.contracts.gov,
    mint: config.contracts.mint,
    oracle: config.contracts.oracle,
    staking: config.contracts.staking,
    mirrorToken: config.contracts['mirror-token'],
    terraswapFactory: config.contracts['terraswap'],
    assets: _.map(config.assets, (asset, symbol) => ({
      symbol,
      name: asset.name,
      token: asset.token,
      pair: asset.pair,
      lpToken: asset.lpToken,
    })),
  });
}
