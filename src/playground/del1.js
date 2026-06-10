// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// ©jdehorty

// @version=5
indicator('Machine Learning: Lorentzian Classification', 'Lorentzian Classification', true, precision=4, max_labels_count=500) 

import jdehorty/MLExtensions/2 as ml
import jdehorty/KernelFunctions/2 as kernels

// ====================
// ==== Custom Types ====
// ====================

type Settings
    float source
    int neighborsCount
    int maxBarsBack
    int featureCount
    int colorCompression
    bool showExits
    bool useDynamicExits

type Label
    int long
    int short
    int neutral

type FeatureArrays
    array<float> f1
    array<float> f2
    array<float> f3
    array<float> f4
    array<float> f5

type FeatureSeries
    float f1
    float f2
    float f3
    float f4
    float f5

type MLModel
    int firstBarIndex
    array<int> trainingLabels
    int loopSize
    float lastDistance
    array<float> distancesArray
    array<int> predictionsArray
    int prediction

type FilterSettings 
    bool useVolatilityFilter
    bool useRegimeFilter
    bool useAdxFilter
    float regimeThreshold
    int adxThreshold

type Filter
    bool volatility
    bool regime
    bool adx 

// ==========================
// ==== Helper Functions ====
// ==========================

series_from(feature_string, _close, _high, _low, _hlc3, f_paramA, f_paramB) =>
    switch feature_string
        "RSI" => ml.n_rsi(_close, f_paramA, f_paramB)
        "WT" => ml.n_wt(_hlc3, f_paramA, f_paramB)
        "CCI" => ml.n_cci(_close, f_paramA, f_paramB)
        "ADX" => ml.n_adx(_high, _low, _close, f_paramA)

get_lorentzian_distance(int i, int featureCount, FeatureSeries featureSeries, FeatureArrays featureArrays) =>
    switch featureCount
        5 => math.log(1+math.abs(featureSeries.f1 - array.get(featureArrays.f1, i))) + 
             math.log(1+math.abs(featureSeries.f2 - array.get(featureArrays.f2, i))) + 
             math.log(1+math.abs(featureSeries.f3 - array.get(featureArrays.f3, i))) + 
             math.log(1+math.abs(featureSeries.f4 - array.get(featureArrays.f4, i))) + 
             math.log(1+math.abs(featureSeries.f5 - array.get(featureArrays.f5, i)))
        4 => math.log(1+math.abs(featureSeries.f1 - array.get(featureArrays.f1, i))) +
             math.log(1+math.abs(featureSeries.f2 - array.get(featureArrays.f2, i))) +
             math.log(1+math.abs(featureSeries.f3 - array.get(featureArrays.f3, i))) +
             math.log(1+math.abs(featureSeries.f4 - array.get(featureArrays.f4, i)))
        3 => math.log(1+math.abs(featureSeries.f1 - array.get(featureArrays.f1, i))) +
             math.log(1+math.abs(featureSeries.f2 - array.get(featureArrays.f2, i))) +
             math.log(1+math.abs(featureSeries.f3 - array.get(featureArrays.f3, i)))
        2 => math.log(1+math.abs(featureSeries.f1 - array.get(featureArrays.f1, i))) +
             math.log(1+math.abs(featureSeries.f2 - array.get(featureArrays.f2, i)))

// ================  
// ==== Inputs ==== 
// ================ 

// Settings Object: General User-Defined Inputs
Settings settings = 
 Settings.new(
   input.source(title='Source', defval=close, group="General Settings", tooltip="Source of the input data"),
   input.int(title='Neighbors Count', defval=8, group="General Settings", minval=1, maxval=100, step=1, tooltip="Number of neighbors to consider"),
   input.int(title="Max Bars Back", defval=2000, group="General Settings"),
   input.int(title="Feature Count", defval=5, group="Feature Engineering", minval=2, maxval=5, tooltip="Number of features to use for ML predictions."),
   input.int(title="Color Compression", defval=1, group="General Settings", minval=1, maxval=10, tooltip="Compression factor for adjusting the intensity of the color scale."),
   input.bool(title="Show Default Exits", defval=false, group="General Settings", tooltip="Default exits occur exactly 4 bars after an entry signal. This corresponds to the predefined length of a trade during the model's training process.", inline="exits"),
   input.bool(title="Use Dynamic Exits", defval=false, group="General Settings", tooltip="Dynamic exits attempt to let profits ride by dynamically adjusting the exit threshold based on kernel regression logic.", inline="exits")
 )
   
// Trade Stats Settings
showTradeStats = input.bool(true, 'Show Trade Stats', tooltip='Displays the trade stats for a given configuration. Useful for optimizing the settings in the Feature Engineering section. This should NOT replace backtesting and should be used for calibration purposes only.', group="General Settings")
useWorstCase = input.bool(false, "Use Worst Case Estimates", tooltip="Whether to use the worst case scenario for backtesting.", group="General Settings")

// Premium Features Group
g_premium = "Premium Features"
use_mean_reversion = input.bool(true, "Enable Mean Reversion Signals", group=g_premium, tooltip="Detect reversal opportunities at extremes")
use_first_pullback = input.bool(true, "Enable First Pullback Detection", group=g_premium, tooltip="Identify trend continuation entries")

// Filter Settings
FilterSettings filterSettings =
 FilterSettings.new(
   input.bool(title="Use Volatility Filter", defval=true, tooltip="Whether to use the volatility filter.", group="Filters"),
   input.bool(title="Use Regime Filter", defval=true, group="Filters", inline="regime"),
   input.bool(title="Use ADX Filter", defval=false, group="Filters", inline="adx"),
   input.float(title="Threshold", defval=-0.1, minval=-10, maxval=10, step=0.1, tooltip="Whether to use the trend detection filter. Threshold for detecting Trending/Ranging markets.", group="Filters", inline="regime"),
   input.int(title="Threshold", defval=20, minval=0, maxval=100, step=1, tooltip="Whether to use the ADX filter. Threshold for detecting Trending/Ranging markets.", group="Filters", inline="adx")
 )

// Filter object for filtering the ML predictions
Filter filter =
 Filter.new(
   ml.filter_volatility(1, 10, filterSettings.useVolatilityFilter), 
   ml.regime_filter(ohlc4, filterSettings.regimeThreshold, filterSettings.useRegimeFilter),
   ml.filter_adx(settings.source, 14, filterSettings.adxThreshold, filterSettings.useAdxFilter)
  )

// Feature Variables: User-Defined Inputs for calculating Feature Series. 
f1_string = input.string(title="Feature 1", options=["RSI", "WT", "CCI", "ADX"], defval="RSI", inline = "01", tooltip="The first feature to use for ML predictions.", group="Feature Engineering")
f1_paramA = input.int(title="Parameter A", tooltip="The primary parameter of feature 1.", defval=14, inline = "02", group="Feature Engineering")
f1_paramB = input.int(title="Parameter B", tooltip="The secondary parameter of feature 2 (if applicable).", defval=1, inline = "02", group="Feature Engineering")
f2_string = input.string(title="Feature 2", options=["RSI", "WT", "CCI", "ADX"], defval="WT", inline = "03", tooltip="The second feature to use for ML predictions.", group="Feature Engineering")
f2_paramA = input.int(title="Parameter A", tooltip="The primary parameter of feature 2.", defval=10, inline = "04", group="Feature Engineering")
f2_paramB = input.int(title="Parameter B", tooltip="The secondary parameter of feature 2 (if applicable).", defval=11, inline = "04", group="Feature Engineering")
f3_string = input.string(title="Feature 3", options=["RSI", "WT", "CCI", "ADX"], defval="CCI", inline = "05", tooltip="The third feature to use for ML predictions.", group="Feature Engineering")
f3_paramA = input.int(title="Parameter A", tooltip="The primary parameter of feature 3.", defval=20, inline = "06", group="Feature Engineering")
f3_paramB = input.int(title="Parameter B", tooltip="The secondary parameter of feature 3 (if applicable).", defval=1, inline = "06", group="Feature Engineering")
f4_string = input.string(title="Feature 4", options=["RSI", "WT", "CCI", "ADX"], defval="ADX", inline = "07", tooltip="The fourth feature to use for ML predictions.", group="Feature Engineering")
f4_paramA = input.int(title="Parameter A", tooltip="The primary parameter of feature 4.", defval=20, inline = "08", group="Feature Engineering")
f4_paramB = input.int(title="Parameter B", tooltip="The secondary parameter of feature 4 (if applicable).", defval=2, inline = "08", group="Feature Engineering")
f5_string = input.string(title="Feature 5", options=["RSI", "WT", "CCI", "ADX"], defval="RSI", inline = "09", tooltip="The fifth feature to use for ML predictions.", group="Feature Engineering")
f5_paramA = input.int(title="Parameter A", tooltip="The primary parameter of feature 5.", defval=9, inline = "10", group="Feature Engineering")
f5_paramB = input.int(title="Parameter B", tooltip="The secondary parameter of feature 5 (if applicable).", defval=1, inline = "10", group="Feature Engineering")

// FeatureSeries Object: Calculated Feature Series based on Feature Variables
featureSeries = 
 FeatureSeries.new(
   series_from(f1_string, close, high, low, hlc3, f1_paramA, f1_paramB), // f1
   series_from(f2_string, close, high, low, hlc3, f2_paramA, f2_paramB), // f2 
   series_from(f3_string, close, high, low, hlc3, f3_paramA, f3_paramB), // f3
   series_from(f4_string, close, high, low, hlc3, f4_paramA, f4_paramB), // f4
   series_from(f5_string, close, high, low, hlc3, f5_paramA, f5_paramB)  // f5
 )

// FeatureArrays Variables: Storage of Feature Series as Feature Arrays Optimized for ML
var f1Array = array.new_float()
var f2Array = array.new_float()
var f3Array = array.new_float()
var f4Array = array.new_float()
var f5Array = array.new_float()
array.push(f1Array, featureSeries.f1)
array.push(f2Array, featureSeries.f2)
array.push(f3Array, featureSeries.f3)
array.push(f4Array, featureSeries.f4)
array.push(f5Array, featureSeries.f5)

// FeatureArrays Object: Storage of the calculated FeatureArrays into a single object
featureArrays = 
 FeatureArrays.new(
  f1Array, // f1
  f2Array, // f2
  f3Array, // f3
  f4Array, // f4
  f5Array  // f5
 )

// Label Object: Used for classifying historical data as training data for the ML Model
Label direction = 
 Label.new(
   long=1, 
   short=-1, 
   neutral=0
  )

// Derived from General Settings
maxBarsBackIndex = last_bar_index >= settings.maxBarsBack ? last_bar_index - settings.maxBarsBack : 0

// EMA Settings 
useEmaFilter = input.bool(title="Use EMA Filter", defval=false, group="Filters", inline="ema")
emaPeriod = input.int(title="Period", defval=200, minval=1, step=1, group="Filters", inline="ema", tooltip="The period of the EMA used for the EMA Filter.")
isEmaUptrend = useEmaFilter ? close > ta.ema(close, emaPeriod) : true
isEmaDowntrend = useEmaFilter ? close < ta.ema(close, emaPeriod) : true
useSmaFilter = input.bool(title="Use SMA Filter", defval=false, group="Filters", inline="sma")
smaPeriod = input.int(title="Period", defval=200, minval=1, step=1, group="Filters", inline="sma", tooltip="The period of the SMA used for the SMA Filter.")
isSmaUptrend = useSmaFilter ? close > ta.sma(close, smaPeriod) : true
isSmaDowntrend = useSmaFilter ? close < ta.sma(close, smaPeriod) : true

// Nadaraya-Watson Kernel Regression Settings
useKernelFilter = input.bool(true, "Trade with Kernel", group="Kernel Settings", inline="kernel")
showKernelEstimate = input.bool(true, "Show Kernel Estimate", group="Kernel Settings", inline="kernel")
useKernelSmoothing = input.bool(false, "Enhance Kernel Smoothing", tooltip="Uses a crossover based mechanism to smoothen kernel color changes. This often results in less color transitions overall and may result in more ML entry signals being generated.", inline='1', group='Kernel Settings')
h = input.int(8, 'Lookback Window', minval=3, tooltip='The number of bars used for the estimation. This is a sliding value that represents the most recent historical bars. Recommended range: 3-50', group="Kernel Settings", inline="kernel")
r = input.float(8., 'Relative Weighting', step=0.25, tooltip='Relative weighting of time frames. As this value approaches zero, the longer time frames will exert more influence on the estimation. As this value approaches infinity, the behavior of the Rational Quadratic Kernel will become identical to the Gaussian kernel. Recommended range: 0.25-25', group="Kernel Settings", inline="kernel")
x = input.int(25, "Regression Level", tooltip='Bar index on which to start regression. Controls how tightly fit the kernel estimate is to the data. Smaller values are a tighter fit. Larger values are a looser fit. Recommended range: 2-25', group="Kernel Settings", inline="kernel")
lag = input.int(2, "Lag", tooltip="Lag for crossover detection. Lower values result in earlier crossovers. Recommended range: 1-2", inline='1', group='Kernel Settings')

// Display Settings
showBarColors = input.bool(true, "Show Bar Colors", tooltip="Whether to show the bar colors.", group="Display Settings")
showBarPredictions = input.bool(defval = true, title = "Show Bar Prediction Values", tooltip = "Will show the ML model's evaluation of each bar as an integer.", group="Display Settings")
useAtrOffset = input.bool(defval = false, title = "Use ATR Offset", tooltip = "Will use the ATR offset instead of the bar prediction offset.", group="Display Settings")
barPredictionsOffset = input.float(0, "Bar Prediction Offset", minval=0, tooltip="The offset of the bar predictions as a percentage from the bar high or close.", group="Display Settings")

// Premium Mean Reversion Settings
g_envelope = "Mean Reversion Settings"
show_envelope = input.bool(true, "Show Envelope", group=g_envelope)
atr_length = input.int(14, "ATR Length", minval=1, group=g_envelope)
near_factor = input.float(1.5, "Near ATR Factor", minval=0.1, maxval=5, step=0.1, group=g_envelope)
far_factor = input.float(2.5, "Far ATR Factor", minval=0.1, maxval=5, step=0.1, group=g_envelope)

// =================================
// ==== Next Bar Classification ====
// =================================

src = settings.source
y_train_series = src[4] < src[0] ? direction.short : src[4] > src[0] ? direction.long : direction.neutral
var y_train_array = array.new_int(0)

// Variables used for ML Logic
var predictions = array.new_float(0)
var prediction = 0.
var signal = direction.neutral
var distances = array.new_float(0)

array.push(y_train_array, y_train_series)

// =========================
// ====  Core ML Logic  ====
// =========================

lastDistance = -1.0
size = math.min(settings.maxBarsBack-1, array.size(y_train_array)-1)
sizeLoop = math.min(settings.maxBarsBack-1, size)

if bar_index >= maxBarsBackIndex
    for i = 0 to sizeLoop
        d = get_lorentzian_distance(i, settings.featureCount, featureSeries, featureArrays) 
        if d >= lastDistance and i%4 != 0
            lastDistance := d            
            array.push(distances, d)
            array.push(predictions, math.round(array.get(y_train_array, i)))
            if array.size(predictions) > settings.neighborsCount
                lastDistance := array.get(distances, math.round(settings.neighborsCount*3/4))
                array.shift(distances)
                array.shift(predictions)
    prediction := array.sum(predictions)

// ============================
// ==== Prediction Filters ====
// ============================

filter_all = filter.volatility and filter.regime and filter.adx

// Filtered Signal
signal := prediction > 0 and filter_all ? direction.long : prediction < 0 and filter_all ? direction.short : nz(signal[1])

// Bar-Count Filters
var int barsHeld = 0
barsHeld := ta.change(signal) != 0 ? 0 : barsHeld + 1
isHeldFourBars = barsHeld == 4
isHeldLessThanFourBars = 0 < barsHeld and barsHeld < 4

// Fractal Filters
isDifferentSignalType = ta.change(signal) != 0
isEarlySignalFlip = ta.change(signal) != 0 and (ta.change(signal[1]) != 0 or ta.change(signal[2]) != 0 or ta.change(signal[3]) != 0)
isBuySignal = signal == direction.long and isEmaUptrend and isSmaUptrend
isSellSignal = signal == direction.short and isEmaDowntrend and isSmaDowntrend
isLastSignalBuy = signal[4] == direction.long and isEmaUptrend[4] and isSmaUptrend[4]
isLastSignalSell = signal[4] == direction.short and isEmaDowntrend[4] and isSmaDowntrend[4]
isNewBuySignal = isBuySignal and isDifferentSignalType
isNewSellSignal = isSellSignal and isDifferentSignalType

// Kernel Regression Filters
c_green = color.new(#009988, 20)
c_red = color.new(#CC3311, 20)
transparent = color.new(#000000, 100)
yhat1 = kernels.rationalQuadratic(settings.source, h, r, x)
yhat2 = kernels.gaussian(settings.source, h-lag, x)
kernelEstimate = yhat1

// Kernel Rates of Change
bool wasBearishRate = yhat1[2] > yhat1[1]
bool wasBullishRate = yhat1[2] < yhat1[1]
bool isBearishRate = yhat1[1] > yhat1
bool isBullishRate = yhat1[1] < yhat1
isBearishChange = isBearishRate and wasBullishRate
isBullishChange = isBullishRate and wasBearishRate

// Kernel Crossovers
bool isBullishCrossAlert = ta.crossover(yhat2, yhat1)
bool isBearishCrossAlert = ta.crossunder(yhat2, yhat1) 
bool isBullishSmooth = yhat2 >= yhat1
bool isBearishSmooth = yhat2 <= yhat1

// Kernel Colors
color colorByCross = isBullishSmooth ? c_green : c_red
color colorByRate = isBullishRate ? c_green : c_red
color plotColor = showKernelEstimate ? (useKernelSmoothing ? colorByCross : colorByRate) : transparent
plot(kernelEstimate, color=plotColor, linewidth=2, title="Kernel Regression Estimate")

// Alert Variables
bool alertBullish = useKernelSmoothing ? isBullishCrossAlert : isBullishChange
bool alertBearish = useKernelSmoothing ? isBearishCrossAlert : isBearishChange

// Bullish and Bearish Filters based on Kernel
isBullish = useKernelFilter ? (useKernelSmoothing ? isBullishSmooth : isBullishRate) : true
isBearish = useKernelFilter ? (useKernelSmoothing ? isBearishSmooth : isBearishRate) : true

// ===========================
// ==== Entries and Exits ====
// ===========================

// Entry Conditions
startLongTrade = isNewBuySignal and isBullish and isEmaUptrend and isSmaUptrend
startShortTrade = isNewSellSignal and isBearish and isEmaDowntrend and isSmaDowntrend

// Dynamic Exit Conditions
lastSignalWasBullish = ta.barssince(startLongTrade) < ta.barssince(startShortTrade)
lastSignalWasBearish = ta.barssince(startShortTrade) < ta.barssince(startLongTrade)
barsSinceRedEntry = ta.barssince(startShortTrade)
barsSinceRedExit = ta.barssince(alertBullish)
barsSinceGreenEntry = ta.barssince(startLongTrade)
barsSinceGreenExit = ta.barssince(alertBearish)
isValidShortExit = barsSinceRedExit > barsSinceRedEntry
isValidLongExit = barsSinceGreenExit > barsSinceGreenEntry
endLongTradeDynamic = (isBearishChange and isValidLongExit[1])
endShortTradeDynamic = (isBullishChange and isValidShortExit[1])

// Fixed Exit Conditions
endLongTradeStrict = ((isHeldFourBars and isLastSignalBuy) or (isHeldLessThanFourBars and isNewSellSignal and isLastSignalBuy)) and startLongTrade[4]
endShortTradeStrict = ((isHeldFourBars and isLastSignalSell) or (isHeldLessThanFourBars and isNewBuySignal and isLastSignalSell)) and startShortTrade[4]
isDynamicExitValid = not useEmaFilter and not useSmaFilter and not useKernelSmoothing
endLongTrade = settings.useDynamicExits and isDynamicExitValid ? endLongTradeDynamic : endLongTradeStrict 
endShortTrade = settings.useDynamicExits and isDynamicExitValid ? endShortTradeDynamic : endShortTradeStrict

// ADD THIS LINE - Position tracking for mean reversion
inPosition = lastSignalWasBullish or lastSignalWasBearish

// =========================
// ==== Premium Features ====
// =========================

show_mean_reversion = use_mean_reversion and timeframe.in_seconds() >= 900  // 15 min or higher

// Mean Reversion - Envelope calculations
atr = ta.atr(atr_length)

// Mean Reversion - Envelope calculations
atr = ta.atr(atr_length)
envelope_upper_near = kernelEstimate + atr * near_factor
envelope_lower_near = kernelEstimate - atr * near_factor
envelope_upper_far = kernelEstimate + atr * far_factor
envelope_lower_far = kernelEstimate - atr * far_factor

// ADD INTRADAY ADJUSTMENT HERE <<<<<<<<<<
// is_intraday = timeframe.in_seconds() <= 3600  // 1 hour or less

// Check if price is outside bands
price_below_near = src < envelope_lower_near
price_above_near = src > envelope_upper_near
price_below_far = src < envelope_lower_far
price_above_far = src > envelope_upper_far

// Mean reversion signals - BALANCED (not too strict, not too flexible)
// Regular signals - need 1 bar reversal
mr_regular_up = use_mean_reversion and price_below_near and src > src[1] and not inPosition
mr_regular_down = use_mean_reversion and price_above_near and src < src[1] and not inPosition

// Strong signals - immediate at extreme levels
mr_strong_up = use_mean_reversion and price_below_far and not inPosition
mr_strong_down = use_mean_reversion and price_above_far and not inPosition

// Dynamic RSI based on recent range
rsi = ta.rsi(src, 14)
rsi_ma = ta.sma(rsi, 50)  // 50-bar average of RSI
rsi_std = ta.stdev(rsi, 50)  // Standard deviation

// Dynamic thresholds
rsi_oversold = rsi_ma - rsi_std  // Typically ~30-40
rsi_overbought = rsi_ma + rsi_std  // Typically ~60-70

// Confirmation using dynamic levels
mr_regular_up_confirmed = mr_regular_up and rsi < rsi_oversold
mr_regular_down_confirmed = mr_regular_down and rsi > rsi_overbought

// First pullback detection
detect_pullback() =>
    pullback_threshold = ta.atr(14) * 0.382  // Fibonacci retracement
    
    // Bullish pullback: price pulls back in uptrend
    bullish_pullback = lastSignalWasBullish and src < src[1] and src > kernelEstimate and src > src[10] - pullback_threshold
    
    // Bearish pullback: price pulls back in downtrend
    bearish_pullback = lastSignalWasBearish and src > src[1] and src < kernelEstimate and src < src[10] + pullback_threshold
    
    [bullish_pullback, bearish_pullback]

[pullback_buy, pullback_sell] = detect_pullback()

// Visual feedback for extreme zones (only once)
bgcolor(show_envelope and price_below_far ? color.new(color.green, 95) : na, title="Extreme Oversold")
bgcolor(show_envelope and price_above_far ? color.new(color.red, 95) : na, title="Extreme Overbought")

// =========================
// ==== Plotting Labels ====
// =========================

// Main entry/exit signals
plotshape(startLongTrade ? low : na, 'Buy', shape.labelup, location.belowbar, color=ml.color_green(prediction), size=size.small, offset=0)
plotshape(startShortTrade ? high : na, 'Sell', shape.labeldown, location.abovebar, ml.color_red(-prediction), size=size.small, offset=0)
plotshape(endLongTrade and settings.showExits ? high : na, 'StopBuy', shape.xcross, location.absolute, color=#3AFF17, size=size.tiny, offset=0)
plotshape(endShortTrade and settings.showExits ? low : na, 'StopSell', shape.xcross, location.absolute, color=#FD1707, size=size.tiny, offset=0)

// Premium: First pullback signals
plotshape(use_first_pullback and pullback_buy ? low : na, 'Pullback Buy', shape.triangleup, location.belowbar, color.new(#00E676, 30), size=size.tiny)
plotshape(use_first_pullback and pullback_sell ? high : na, 'Pullback Sell', shape.triangledown, location.abovebar, color.new(#FF5252, 30), size=size.tiny)

// Premium: Mean reversion signals - COMPLETE SET
// Regular unconfirmed - using 'o' instead of bullet
// plotchar(use_mean_reversion and mr_regular_up and not inPosition ? low : na, 'MR Up', 'o', location.belowbar, color.new(#00E676, 20), size=size.tiny)
// Just use the basic signals
// Premium: Mean reversion signals - BETTER VISIBILITY
// Offset for distance from candles
mr_offset = ta.atr(14) * 0.3  // 30% of ATR for spacing

// Regular signals - Using ◆ (diamond) with offset
// plotshape(use_mean_reversion and mr_regular_up and not inPosition ? low - mr_offset : na, 
//     'MR Up', shape.diamond, location.absolute, color.new(#00E676, 0), size=size.small)
plotchar(use_mean_reversion and mr_regular_up and not inPosition ? low : na, 'MR Up', 'o', location.belowbar, color.new(#00E676, 20), size=size.tiny)
// plotshape(use_mean_reversion and mr_regular_down and not inPosition ? high + mr_offset : na, 
//     'MR Down', shape.diamond, location.absolute, color.new(#FF5252, 0), size=size.small)

// // RSI Confirmed - Bigger diamonds
// plotshape(use_mean_reversion and mr_regular_up_confirmed and not inPosition ? low - mr_offset * 1.5 : na, 
//     'MR Up Confirmed', shape.diamond, location.absolute, #00E676, size=size.normal)
// plotshape(use_mean_reversion and mr_regular_down_confirmed and not inPosition ? high + mr_offset * 1.5 : na, 
//     'MR Down Confirmed', shape.diamond, location.absolute, #FF5252, size=size.normal)

// // Strong reversals - Keep triangles but bigger
// plotshape(use_mean_reversion and mr_strong_up and not inPosition ? low - mr_offset * 2 : na, 
//     'Strong MR Up', shape.triangleup, location.absolute, #00E676, size=size.normal)
// plotshape(use_mean_reversion and mr_strong_down and not inPosition ? high + mr_offset * 2 : na, 
//     'Strong MR Down', shape.triangledown, location.absolute, #FF5252, size=size.normal)



// Premium: Envelope
p1 = plot(show_envelope ? envelope_upper_near : na, "Upper Near", color.new(#B2B5BE, 80), 1)
p2 = plot(show_envelope ? envelope_lower_near : na, "Lower Near", color.new(#B2B5BE, 80), 1)
p3 = plot(show_envelope ? envelope_upper_far : na, "Upper Far", color.new(#B2B5BE, 90), 1)
p4 = plot(show_envelope ? envelope_lower_far : na, "Lower Far", color.new(#B2B5BE, 90), 1)
fill(p1, p3, color=show_envelope ? color.new(#B2B5BE, 96) : na)
fill(p2, p4, color=show_envelope ? color.new(#B2B5BE, 96) : na)

// ================
// ==== Alerts ====
// ================ 

// Separate Alerts for Entries and Exits
alertcondition(startLongTrade, title='Open Long ▲', message='LDC Open Long ▲ | {{ticker}}@{{close}} | ({{interval}})')
alertcondition(endLongTrade, title='Close Long ▲', message='LDC Close Long ▲ | {{ticker}}@{{close}} | ({{interval}})')
alertcondition(startShortTrade, title='Open Short ▼', message='LDC Open Short  | {{ticker}}@{{close}} | ({{interval}})')
alertcondition(endShortTrade, title='Close Short ▼', message='LDC Close Short ▼ | {{ticker}}@{{close}} | ({{interval}})')

// Combined Alerts for Entries and Exits
alertcondition(startShortTrade or startLongTrade, title='Open Position ▲▼', message='LDC Open Position ▲▼ | {{ticker}}@{{close}} | ({{interval}})')
alertcondition(endShortTrade or endLongTrade, title='Close Position ▲▼', message='LDC Close Position  ▲▼ | {{ticker}}@[{{close}}] | ({{interval}})')

// Kernel Estimate Alerts
alertcondition(condition=alertBullish, title='Kernel Bullish Color Change', message='LDC Kernel Bullish ▲ | {{ticker}}@{{close}} | ({{interval}})')
alertcondition(condition=alertBearish, title='Kernel Bearish Color Change', message='LDC Kernel Bearish ▼ | {{ticker}}@{{close}} | ({{interval}})')

// Premium Alerts
alertcondition(pullback_buy, "Pullback Buy", "LC Premium Pullback Buy | {{ticker}}@{{close}}")
alertcondition(pullback_sell, "Pullback Sell", "LC Premium Pullback Sell | {{ticker}}@{{close}}")
alertcondition(mr_regular_up, "Mean Rev Up", "LC Premium Mean Reversion Up | {{ticker}}@{{close}}")
alertcondition(mr_regular_down, "Mean Rev Down", "LC Premium Mean Reversion Down | {{ticker}}@{{close}}")

// =========================
// ==== Display Signals ==== 
// =========================

atrSpaced = useAtrOffset ? ta.atr(1) : na
compressionFactor = settings.neighborsCount / settings.colorCompression
c_pred = prediction > 0 ? color.from_gradient(prediction, 0, compressionFactor, #787b86, #009988) : prediction <= 0 ? color.from_gradient(prediction, -compressionFactor, 0, #CC3311, #787b86) : na
c_label = showBarPredictions ? c_pred : na
c_bars = showBarColors ? color.new(c_pred, 50) : na
x_val = bar_index
y_val = useAtrOffset ? prediction > 0 ? high + atrSpaced: low - atrSpaced : prediction > 0 ? high + hl2*barPredictionsOffset/20 : low - hl2*barPredictionsOffset/30
label.new(x_val, y_val, str.tostring(prediction), xloc.bar_index, yloc.price, color.new(color.white, 100), label.style_label_up, c_label, size.normal, text.align_left)
barcolor(showBarColors ? color.new(c_pred, 50) : na)

// ===================== 
// ==== Backtesting ====
// =====================

// The following can be used to stream signals to a backtest adapter
backTestStream = switch 
    startLongTrade => 1
    endLongTrade => 2
    startShortTrade => -1
    endShortTrade => -2
plot(backTestStream, "Backtest Stream", display=display.none)

// Call backtesting with original signals directly
[totalWins, totalLosses, totalEarlySignalFlips, totalTrades, tradeStatsHeader, winLossRatio, winRate] = ml.backtest(high, low, open, startLongTrade, endLongTrade, startShortTrade, endShortTrade, isEarlySignalFlip, maxBarsBackIndex, bar_index, settings.source, useWorstCase)

// Original table helper functions
init_table() =>
    c_transparent = color.new(color.black, 100)
    table.new(position.top_right, columns=2, rows=7, frame_color=color.new(color.black, 100), frame_width=1, border_width=1, border_color=c_transparent)

update_table(tbl, tradeStatsHeader, totalTrades, totalWins, totalLosses, winLossRatio, winRate, stopLosses) => 
    c_transparent = color.new(color.black, 100)
    table.cell(tbl, 0, 0, tradeStatsHeader, text_halign=text.align_center, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 0, 1, 'Winrate', text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 1, 1, str.tostring(totalWins / totalTrades, '#.#%'), text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 0, 2, 'Trades', text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 1, 2, str.tostring(totalTrades, '#') + ' (' + str.tostring(totalWins, '#') + '|' + str.tostring(totalLosses, '#') + ')', text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 0, 5, 'WL Ratio', text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 1, 5, str.tostring(totalWins / totalLosses, '0.00'), text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 0, 6, 'Early Signal Flips', text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)
    table.cell(tbl, 1, 6, str.tostring(totalEarlySignalFlips, '#'), text_halign=text.align_center, bgcolor=c_transparent, text_color=color.gray, text_size=size.normal)

// Display original style table
if showTradeStats
    var tbl = init_table()
    if barstate.islast
        update_table(tbl, tradeStatsHeader, totalTrades, totalWins, totalLosses, winLossRatio, winRate, totalEarlySignalFlips)
        
        // ADD DEBUG LABEL HERE
        debugText = "Features: " + str.tostring(settings.featureCount) + " | Neighbors: " + str.tostring(settings.neighborsCount) + " | Compression: " + str.tostring(settings.colorCompression)
        label.new(bar_index - 30, high * 1.02, debugText, style=label.style_label_down, color=color.yellow, textcolor=color.black, size=size.small)


        // TEMPORARY DEBUG - Check if conditions are met
if barstate.islast and show_envelope
debugMR = "Below Near: " + str.tostring(price_below_near) + " | Above Near: " + str.tostring(price_above_near) + " | In Pos: " + str.tostring(inPosition)
label.new(bar_index - 60, low * 0.98, debugMR, style=label.style_label_up, color=color.orange, size=size.small)