package tech.cassandre.trading.bot.test.service.dry;

import io.qase.api.annotation.CaseId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import tech.cassandre.trading.bot.batch.TickerFlux;
import tech.cassandre.trading.bot.dto.market.TickerDTO;
import tech.cassandre.trading.bot.dto.position.PositionCreationResultDTO;
import tech.cassandre.trading.bot.dto.position.PositionDTO;
import tech.cassandre.trading.bot.dto.position.PositionRulesDTO;
import tech.cassandre.trading.bot.service.PositionService;
import tech.cassandre.trading.bot.test.util.junit.BaseTest;
import tech.cassandre.trading.bot.test.util.junit.configuration.Configuration;
import tech.cassandre.trading.bot.test.util.junit.configuration.Property;
import tech.cassandre.trading.bot.test.strategy.basic.TestableCassandreStrategy;
import tech.cassandre.trading.bot.util.exception.PositionException;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.awaitility.Awaitility.await;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD;
import static tech.cassandre.trading.bot.dto.position.PositionStatusDTO.CLOSED;
import static tech.cassandre.trading.bot.dto.position.PositionStatusDTO.OPENED;
import static tech.cassandre.trading.bot.dto.position.PositionStatusDTO.OPENING;
import static tech.cassandre.trading.bot.test.util.junit.configuration.ConfigurationExtension.PARAMETER_EXCHANGE_DRY;

@SpringBootTest
@DisplayName("Service - Dry - Position service")
@Configuration({
        @Property(key = PARAMETER_EXCHANGE_DRY, value = "true")
})
@DirtiesContext(classMode = BEFORE_EACH_TEST_METHOD)
@Import(PositionServiceForceClosingTestMock.class)
public class PositionServiceForceClosingTest extends BaseTest {

    @Autowired
    private PositionService positionService;

    @Autowired
    private TestableCassandreStrategy strategy;

    @Autowired
    private TickerFlux tickerFlux;

    @Test
    @CaseId(64)
    @DisplayName("Check force closing")
    public void checkForceClosing() throws InterruptedException {
        // First tickers - cp1 & cp2 (dry mode).
        // ETH/BTC - 0.2.
        // ETH/USDT - 0.3.
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_BTC).last(new BigDecimal("0.2")).build());
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_USDT).last(new BigDecimal("0.3")).build());

        // =============================================================================================================
        // Step 1 - Creates position 1 (ETH/BTC, 0.0001, 100% stop gain, price of 0.2).
        // As the order is validated and the trade arrives, the position should be opened.
        final PositionCreationResultDTO position1Result = strategy.createLongPosition(ETH_BTC,
                new BigDecimal("0.0001"),
                PositionRulesDTO.builder().stopGainPercentage(100f).build());
        assertTrue(position1Result.isSuccessful());
        assertEquals("DRY_ORDER_000000001", position1Result.getPosition().getOpeningOrder().getOrderId());
        final long position1Id = position1Result.getPosition().getId();

        // After position creation, its status is OPENING
        // Few seconds after, order and trade will arrive and status will be OPENED.
        // Two updates will have been received.
        assertEquals(OPENING, getPositionDTO(position1Id).getStatus());
        await().untilAsserted(() -> assertEquals(3, strategy.getPositionsUpdateReceived().size()));
        await().untilAsserted(() -> assertEquals(2, strategy.getPositionsStatusUpdateReceived().size()));
        await().untilAsserted(() -> assertEquals(OPENED, getPositionDTO(position1Id).getStatus()));
        await().untilAsserted(() -> assertEquals(OPENED, strategy.getPositionsStatusUpdateReceived().get(1).getStatus()));

        // =============================================================================================================
        // Step 2 - Creates position 2 (ETH/BTC, 0.0002, 20% stop loss, price of 0.2).
        // As the order is validated and the trade arrives, the position should be opened.
        final PositionCreationResultDTO position2Result = strategy.createLongPosition(ETH_USDT,
                new BigDecimal("0.0002"),
                PositionRulesDTO.builder().stopLossPercentage(20f).build());
        assertTrue(position2Result.isSuccessful());
        assertEquals("DRY_ORDER_000000002", position2Result.getPosition().getOpeningOrder().getOrderId());
        final long position2Id = position2Result.getPosition().getId();

        // After position creation, its status is OPENING
        // Few seconds after, order and trade will arrive and status will be OPENED.
        // Two updates will have been received.
        assertEquals(OPENING, getPositionDTO(position2Id).getStatus());
        await().untilAsserted(() -> assertEquals(6, strategy.getPositionsUpdateReceived().size()));
        await().untilAsserted(() -> assertEquals(4, strategy.getPositionsStatusUpdateReceived().size()));
        await().untilAsserted(() -> assertEquals(OPENED, getPositionDTO(position2Id).getStatus()));
        await().untilAsserted(() -> assertEquals(OPENED, strategy.getPositionsStatusUpdateReceived().get(3).getStatus()));

        // =============================================================================================================
        // Tickers are coming.

        // Second tickers - cp1 & cp2.
        // ETH, BTC - bid 0.2 / ask 0.3 - 50% gain.
        // ETH, USDT - bid 0,3 / ask 0.3 - no gain.
        // No change.
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_BTC).last(new BigDecimal("0.2")).build());
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_USDT).last(new BigDecimal("0.3")).build());
        TimeUnit.SECONDS.sleep(WAITING_TIME_IN_SECONDS);
        assertEquals(OPENED, getPositionDTO(position1Id).getStatus());
        assertEquals(OPENED, getPositionDTO(position2Id).getStatus());

        // Third tickers.
        // ETH, BTC - bid 0.21 / ask 0.31.
        // ETH, USDT - bid 0,31 / ask 0.31.
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_BTC).last(new BigDecimal("0.21")).build());
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_USDT).last(new BigDecimal("0.31")).build());
        TimeUnit.SECONDS.sleep(WAITING_TIME_IN_SECONDS);
        assertEquals(OPENED, getPositionDTO(position1Id).getStatus());
        assertEquals(OPENED, getPositionDTO(position2Id).getStatus());
        assertFalse(getPositionDTO(position1Id).isForceClosing());
        assertFalse(getPositionDTO(position2Id).isForceClosing());

        // We will force closing of position 2.
        strategy.closePosition(position2Id);
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_BTC).last(new BigDecimal("0.21")).build());
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_USDT).last(new BigDecimal("0.31")).build());
        TimeUnit.SECONDS.sleep(WAITING_TIME_IN_SECONDS);
        assertEquals(OPENED, getPositionDTO(position1Id).getStatus());
        assertEquals(CLOSED, getPositionDTO(position2Id).getStatus());
        assertFalse(getPositionDTO(position1Id).isForceClosing());
        assertTrue(getPositionDTO(position2Id).isForceClosing());

        // We will force closing of position 1.
        strategy.closePosition(position1Id);
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_BTC).last(new BigDecimal("0.21")).build());
        tickerFlux.emitValue(TickerDTO.builder().currencyPair(ETH_USDT).last(new BigDecimal("0.31")).build());
        TimeUnit.SECONDS.sleep(WAITING_TIME_IN_SECONDS);
        assertEquals(CLOSED, getPositionDTO(position1Id).getStatus());
        assertEquals(CLOSED, getPositionDTO(position2Id).getStatus());
    }

    /**
     * Retrieve position from database.
     *
     * @param id position id
     * @return position
     */
    private PositionDTO getPositionDTO(final long id) {
        final Optional<PositionDTO> p = positionService.getPositionById(id);
        if (p.isPresent()) {
            return p.get();
        } else {
            throw new PositionException("Position not found : " + id);
        }
    }

}