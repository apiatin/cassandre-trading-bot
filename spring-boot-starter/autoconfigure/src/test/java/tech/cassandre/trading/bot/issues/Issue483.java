package tech.cassandre.trading.bot.issues;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import tech.cassandre.trading.bot.batch.TickerFlux;
import tech.cassandre.trading.bot.dto.position.PositionDTO;
import tech.cassandre.trading.bot.test.util.junit.BaseTest;
import tech.cassandre.trading.bot.test.util.junit.configuration.Configuration;
import tech.cassandre.trading.bot.test.util.junit.configuration.Property;
import tech.cassandre.trading.bot.test.util.strategies.TestableCassandreStrategy;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD;

@SpringBootTest
@DisplayName("Github issue 483")
@Configuration({
        @Property(key = "spring.datasource.data", value = "classpath:/issue483.sql")
})
@DirtiesContext(classMode = BEFORE_EACH_TEST_METHOD)
@Import(Issue470Mock.class)
public class Issue483 extends BaseTest {

    @Autowired
    private TestableCassandreStrategy strategy;

    @Autowired
    private TickerFlux tickerFlux;

    @Test
    @DisplayName("Check onPositionStatusUpdate not called after restart")
    public void checkGainsCalculation() throws InterruptedException {
        // In the bug, position short n°24 had no gain.
        final Optional<PositionDTO> position = strategy.getPositionByPositionId(24);
        assertTrue(position.isPresent());
        assertTrue(position.get().getLatestCalculatedGain().isPresent());
        assertNotEquals(0, position.get().getLatestCalculatedGain().get().getPercentage());
    }

}