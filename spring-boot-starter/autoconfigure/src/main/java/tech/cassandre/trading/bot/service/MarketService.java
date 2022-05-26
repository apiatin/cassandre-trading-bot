package tech.cassandre.trading.bot.service;

import tech.cassandre.trading.bot.dto.market.TickerDTO;
import tech.cassandre.trading.bot.dto.util.CurrencyPairDTO;

import java.util.Optional;
import java.util.Set;

/**
 * Service getting information about market prices.
 */
public interface MarketService {

    /**
     * Get a ticker for a currency pair.
     *
     * @param currencyPair currency pair
     * @return ticker
     */
    Optional<TickerDTO> getTicker(CurrencyPairDTO currencyPair);

    /**
     * Get tickers for several currency pairs.
     *
     * @param currencyPairs currency pairs
     * @return tickers
     */
    Set<TickerDTO> getTickers(Set<CurrencyPairDTO> currencyPairs);

}
