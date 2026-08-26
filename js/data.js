// =============================================
// Quantum Temple - 168 Days Quest Data
// =============================================

const HALLS = [
  {
    id: 'hall-1',
    order: 1,
    name: "Initiate's Step",
    cnName: '啟蒙之階',
    month: '第1月',
    theme: '環境搭建 + Python金融基礎 + QuantConnect入門',
    color: '#4dd0ff',
    startDay: 1,
    endDay: 28,
  },
  {
    id: 'hall-2',
    order: 2,
    name: 'Data Sanctum',
    cnName: '數據之殿',
    month: '第2月',
    theme: '數據管線 + AWS S3 + 市場數據處理',
    color: '#6a5acd',
    startDay: 29,
    endDay: 56,
  },
  {
    id: 'hall-3',
    order: 3,
    name: 'Strategy Spire',
    cnName: '策略之塔',
    month: '第3月',
    theme: '3種經典策略實現 + 指標體系',
    color: '#ff77dd',
    startDay: 57,
    endDay: 84,
  },
  {
    id: 'hall-4',
    order: 4,
    name: 'Backtest Abyss',
    cnName: '回測之淵',
    month: '第4月',
    theme: '嚴格回測方法論 + 風控框架',
    color: '#ff6b6b',
    startDay: 85,
    endDay: 112,
  },
  {
    id: 'hall-5',
    order: 5,
    name: 'Factor Apex',
    cnName: '因子之巔',
    month: '第5月',
    theme: '多因子模型 + 機器學習因子',
    color: '#ffd93d',
    startDay: 113,
    endDay: 140,
  },
  {
    id: 'hall-6',
    order: 6,
    name: 'Quant Deity',
    cnName: '量化之神',
    month: '第6月',
    theme: '系統整合 + AWS部署 + 紙面交易',
    color: '#ffd700',
    startDay: 141,
    endDay: 168,
  },
];

// =============================================
// Full 168-Day STEPS Array
// =============================================
const STEPS = [
  { day: 1, hall: 1, title: '安裝環境', desc: '安裝 Cursor，配置 Python 3.11+，安裝 pandas/numpy/matplotlib', tools: 'Cursor', acceptance: 'python import 成功', type: 'daily', resources: [
    { name: 'Cursor IDE 官網', url: 'https://cursor.sh' },
    { name: 'Python 3.11 安裝指南', url: 'https://www.python.org/downloads/' },
  ] },
  { day: 2, hall: 1, title: '註冊QC與Local', desc: '註冊 QuantConnect 帳號，安裝 QuantConnect Local Platform 擴展', tools: 'QuantConnect', acceptance: '能在 Cursor 中打開 QC 工作區', type: 'daily', resources: [
    { name: 'QuantConnect 官網', url: 'https://www.quantconnect.com' },
    { name: 'QC Local Platform 文檔', url: 'https://www.quantconnect.com/docs/v2/local-platform/' },
  ] },
  { day: 3, hall: 1, title: '註冊AWS配置CLI', desc: '註冊 AWS 帳號，創建 IAM User，安裝 AWS CLI 配置 credentials', tools: 'AWS', acceptance: 'aws s3 ls 能列出 bucket', type: 'daily', resources: [
    { name: 'AWS 官網', url: 'https://aws.amazon.com' },
    { name: 'AWS CLI 安裝', url: 'https://docs.aws.amazon.com/cli/' },
    { name: 'IAM 入門', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html' },
  ] },
  { day: 4, hall: 1, title: '創建Git倉庫', desc: '創建 Git 倉庫 quant-temple，建立 /strategies /data /notebooks /config 目錄', tools: 'Git', acceptance: '第一次 commit push 成功', type: 'daily', resources: [
    { name: 'Git 官網', url: 'https://git-scm.com' },
    { name: 'GitHub 入門', url: 'https://guides.github.com/activities/hello-world/' },
  ] },
  { day: 5, hall: 1, title: '首個股價腳本', desc: '用 Cursor 寫 Python 腳本：yfinance 下載 AAPL 股價，畫 K 線圖', tools: 'Cursor + yfinance', acceptance: '生成 PNG 股價圖', type: 'daily', resources: [
    { name: 'yfinance PyPI', url: 'https://pypi.org/project/yfinance/' },
    { name: 'Matplotlib 文檔', url: 'https://matplotlib.org/stable/contents.html' },
  ] },
  { day: 6, hall: 1, title: 'Pandas核心操作', desc: '學習 pandas 核心操作：resample/rolling/merge/groupby，完成 10 個練習', tools: 'Jupyter', acceptance: '完成 10 個 pandas 練習', type: 'daily', resources: [
    { name: 'Pandas 官方教程', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
    { name: 'Pandas Cheat Sheet', url: 'https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf' },
  ] },
  { day: 7, hall: 1, title: '首週回顧', desc: '整理本週筆記，在 QuantConnect 跑通官方 Hello World 算法', tools: 'QuantConnect', acceptance: '回測成功有收益曲線', type: 'milestone', resources: [
    { name: 'QC Learning Center', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 8, hall: 1, title: 'QC入門Bootcamp', desc: '完成 QuantConnect Bootcamp: Getting Started 全部課程', tools: 'QuantConnect', acceptance: '所有課程標記完成', type: 'daily', resources: [
    { name: 'QC Bootcamp', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 9, hall: 1, title: 'QC指標Bootcamp', desc: '完成 Bootcamp: Indicators（SMA/EMA/RSI/MACD）', tools: 'QuantConnect', acceptance: '能在算法中調用 4 種指標', type: 'daily', resources: [
    { name: 'QC 指標文檔', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/' },
  ] },
  { day: 10, hall: 1, title: '算法生命週期', desc: '理解 Initialize → OnData → OnEndOfAlgorithm 生命週期，手寫註解', tools: 'QuantConnect', acceptance: '能口述每個階段作用', type: 'daily', resources: [
    { name: 'QC 算法框架', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/' },
  ] },
  { day: 11, hall: 1, title: 'Buy&Hold策略', desc: '實現 Buy & Hold 策略（買 SPY 持有），理解回測報告指標', tools: 'QuantConnect', acceptance: 'Sharpe/Drawdown/CAGR 能口述含義', type: 'daily', resources: [
    { name: 'QC 回測文檔', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/' },
  ] },
  { day: 12, hall: 1, title: '雙均線交叉策略', desc: '實現雙均線交叉策略（SMA50 上穿 SMA200 買入）', tools: 'QuantConnect', acceptance: '回測 2010-2024 有交易記錄', type: 'daily', resources: [
    { name: 'QC 移動平均', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/supported-indicators/moving-average' },
  ] },
  { day: 13, hall: 1, title: 'History自製RSI', desc: '學習 History 請求，用歷史數據自己計算 RSI（不使用內建指標）', tools: 'QuantConnect', acceptance: '自製 RSI 與內建 RSI 誤差 < 1%', type: 'daily', resources: [
    { name: 'QC 歷史數據', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/' },
  ] },
  { day: 14, hall: 1, title: '第二週回顧整理策略', desc: '把本週 3 個策略整理到 Git，寫 README 說明', tools: 'Git', acceptance: '倉庫有 3 個策略文件', type: 'milestone', resources: [
    { name: 'Git 文檔', url: 'https://git-scm.com/doc' },
  ] },
  { day: 15, hall: 1, title: '讀Markowitz論文', desc: '讀 Markowitz (1952) Portfolio Selection 第 1-2 節', tools: '論文', acceptance: '能用自己的話解釋均值-方差', type: 'daily', resources: [
    { name: 'Markowitz 1952', url: 'https://doi.org/10.1111/j.1540-6261.1952.tb01525.x' },
  ] },
  { day: 16, hall: 1, title: '投資組合理論實戰', desc: '看 QuantPy YouTube：Modern Portfolio Theory，手寫實現有效前沿', tools: 'YouTube + Python', acceptance: '手寫實現有效前沿', type: 'daily', resources: [
    { name: 'QuantPy 頻道', url: 'https://www.youtube.com/@QuantPy' },
  ] },
  { day: 17, hall: 1, title: '金融數據基礎', desc: '學習 OHLCV、複權價格、survivorship bias 概念', tools: '自學', acceptance: '寫 500 字筆記', type: 'daily', resources: [
    { name: '金融數據入門', url: 'https://www.investopedia.com/terms/o/ohlcchart.asp' },
  ] },
  { day: 18, hall: 1, title: '績效指標學習', desc: '學習 Sharpe/Sortino/Max Drawdown/CAGR/Win Rate，Python 手算', tools: 'Python', acceptance: '能手算 5 個指標', type: 'daily', resources: [
    { name: 'Sharpe Ratio 解釋', url: 'https://www.investopedia.com/terms/s/sharperatio.asp' },
  ] },
  { day: 19, hall: 1, title: '讀Sharpe CAPM', desc: '讀 Sharpe (1964) CAPM 論文精華部分', tools: '論文', acceptance: '解釋 Beta 和 Alpha 含義', type: 'daily', resources: [
    { name: 'Sharpe 1964', url: 'https://doi.org/10.1111/j.1540-6261.1964.tb02825.x' },
  ] },
  { day: 20, hall: 1, title: '績效模組', desc: '用 Cursor 寫 performance.py 模組，輸入收益序列輸出所有指標', tools: 'Cursor', acceptance: '模組通過單元測試', type: 'daily', resources: [
    { name: 'Python 單元測試', url: 'https://docs.python.org/3/library/unittest.html' },
  ] },
  { day: 21, hall: 1, title: '第三週回顧分析報告', desc: '用 performance.py 分析雙均線策略，寫一份分析報告', tools: 'Python', acceptance: '報告包含 5 個指標和解讀', type: 'milestone', resources: [
    { name: '績效分析指南', url: 'https://www.investopedia.com/articles/investing/101315/how-analyze-your-trading-performance.asp' },
  ] },
  { day: 22, hall: 1, title: '設計RSI均值回歸策略', desc: '設計 RSI 均值回歸策略：RSI<30 買入，RSI>70 賣出', tools: 'QuantConnect', acceptance: '策略邏輯清晰', type: 'daily', resources: [
    { name: 'RSI 指標解釋', url: 'https://www.investopedia.com/terms/r/rsi.asp' },
  ] },
  { day: 23, hall: 1, title: 'RSI策略回測', desc: '在 QuantConnect 回測 RSI 策略（2015-2024，SPY）', tools: 'QuantConnect', acceptance: '回測完成', type: 'daily', resources: [
    { name: 'QC 回測', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/' },
  ] },
  { day: 24, hall: 1, title: '加入止損止盈', desc: '加入止損(-5%)和止盈(+10%)邏輯', tools: 'QuantConnect', acceptance: '交易記錄中有止損止盈', type: 'daily', resources: [
    { name: 'QC 訂單類型', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-types' },
  ] },
  { day: 25, hall: 1, title: '對比有無止損止盈', desc: '對比有/無止損止盈的績效差異，生成對比表格', tools: 'Python', acceptance: '生成對比表格', type: 'daily', resources: [
    { name: '止損策略', url: 'https://www.investopedia.com/articles/stocks/09/use-stop-loss.asp' },
  ] },
  { day: 26, hall: 1, title: '看QC策略優化教程', desc: '看 Ritvik YouTube：QuantConnect 策略優化教程', tools: 'YouTube', acceptance: '理解 parameter optimization', type: 'daily', resources: [
    { name: 'Financial Programming with Ritvik', url: 'https://www.youtube.com/@FinancialProgrammingwithRitvik' },
  ] },
  { day: 27, hall: 1, title: 'RSI參數優化', desc: '對 RSI 策略做參數優化（閾值、持倉天數），記錄結果', tools: 'QuantConnect', acceptance: '參數熱圖或表格', type: 'daily', resources: [
    { name: 'QC 參數優化', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/' },
  ] },
  { day: 28, hall: 1, title: '第一月里程碑', desc: '整理第 1 月所有產出，更新 Git，寫月度總結', tools: 'Git', acceptance: '倉庫有 README + 4 策略 + 分析報告', type: 'hall-boss', resources: [
    { name: '月度回顧方法', url: 'https://www.forbes.com/sites/forbescoachescouncil/2020/12/17/how-to-conduct-an-effective-monthly-review/' },
  ] },
  { day: 29, hall: 2, title: '研究數據源寫對比表', desc: '研究 yfinance/Alpha Vantage/Polygon/QC 數據，寫對比表', tools: '調研', acceptance: '完成數據源對比表', type: 'daily', resources: [
    { name: 'Alpha Vantage', url: 'https://www.alphavantage.co/' },
    { name: 'Polygon.io', url: 'https://polygon.io/' },
    { name: 'yfinance', url: 'https://pypi.org/project/yfinance/' },
  ] },
  { day: 30, hall: 2, title: '數據獲取腳本', desc: '從 yfinance 批量下載 S&P 500 成分股日線數據', tools: 'Cursor + yfinance', acceptance: '能下載 500 支股票數據', type: 'daily', resources: [
    { name: 'yfinance 文檔', url: 'https://pypi.org/project/yfinance/' },
    { name: 'S&P 500 列表', url: 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies' },
  ] },
  { day: 31, hall: 2, title: 'Universe粗篩', desc: '學習 QC Universe Selection：粗篩（價格 > $5, 成交量 > 1M）', tools: 'QuantConnect', acceptance: '實現粗篩 Universe', type: 'daily', resources: [
    { name: 'QC Universe Selection', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/universes/' },
  ] },
  { day: 32, hall: 2, title: '基本面篩選', desc: '用 Fundamental 數據篩選（市值、PE、ROE）', tools: 'QuantConnect', acceptance: '能篩出 50 支質量股', type: 'daily', resources: [
    { name: 'QC 基本面數據', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/quantconnect/us-equity-fundamental-data' },
  ] },
  { day: 33, hall: 2, title: '讀數據窺探偏誤', desc: '讀關於 data snooping bias 的入門文章', tools: '論文', acceptance: '理解為何不能用未來數據', type: 'daily', resources: [
    { name: 'Data Snooping 解釋', url: 'https://www.investopedia.com/terms/d/datasnooping.asp' },
  ] },
  { day: 34, hall: 2, title: 'PIT與未來函數', desc: '學習點狀圖(PIT)數據，避免 look-ahead bias', tools: '自學', acceptance: '代碼中加入 PIT 檢查', type: 'daily', resources: [
    { name: 'Look-Ahead Bias', url: 'https://www.investopedia.com/terms/l/lookaheadbias.asp' },
  ] },
  { day: 35, hall: 2, title: '第五週回顧', desc: '數據獲取模組完成，一鍵下載並存儲', tools: 'Git', acceptance: 'data_fetcher.py 可運行', type: 'milestone', resources: [
    { name: '數據管理最佳實踐', url: 'https://www.dataquest.io/blog/data-cleaning/' },
  ] },
  { day: 36, hall: 2, title: '創建S3 Bucket', desc: '創建 S3 Bucket quant-temple-data，配置版本控制和加密', tools: 'AWS S3', acceptance: 'Bucket 創建成功', type: 'daily', resources: [
    { name: 'AWS S3 入門', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html' },
  ] },
  { day: 37, hall: 2, title: '寫s3_uploader', desc: '將本地 CSV 數據上傳到 S3（按日期分區）', tools: 'Cursor + boto3', acceptance: '數據成功上傳 S3', type: 'daily', resources: [
    { name: 'Boto3 S3 文檔', url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html' },
  ] },
  { day: 38, hall: 2, title: 'S3下載腳本', desc: '從 S3 按日期範圍下載數據', tools: 'boto3', acceptance: '能精確檢索某段時間數據', type: 'daily', resources: [
    { name: 'Boto3 下載', url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-example-download-file.html' },
  ] },
  { day: 39, hall: 2, title: '學習AWS IAM策略', desc: '為數據讀取創建只讀 policy，為寫入創建寫入 policy', tools: 'AWS IAM', acceptance: '兩個 IAM Role 配置完成', type: 'daily', resources: [
    { name: 'AWS IAM 策略', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html' },
  ] },
  { day: 40, hall: 2, title: '看AWSS3入門影片', desc: '看 YouTube：AWS S3 for Data Engineers 入門', tools: 'YouTube', acceptance: '理解 S3 存儲類型和成本', type: 'daily', resources: [
    { name: 'AWS 官方 YouTube', url: 'https://www.youtube.com/@amazonwebservices' },
  ] },
  { day: 41, hall: 2, title: 'Lambda定時更新', desc: '每天自動下載最新日線並上傳 S3', tools: 'AWS Lambda + EventBridge', acceptance: 'Lambda 能觸發數據更新', type: 'daily', resources: [
    { name: 'AWS Lambda', url: 'https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html' },
    { name: 'EventBridge', url: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-get-started.html' },
  ] },
  { day: 42, hall: 2, title: '第六週回顧數據管線打通', desc: '數據管線全鏈路打通（下載 → 清洗 → S3 → 讀取）', tools: '整合', acceptance: '一鍵腳本跑完整流程', type: 'milestone', resources: [
    { name: '數據管線設計', url: 'https://aws.amazon.com/big-data/datalakes-and-analytics/' },
  ] },
  { day: 43, hall: 2, title: '數據清洗腳本', desc: '處理缺失值、異常值、複權調整', tools: 'pandas', acceptance: '清洗前後數據對比報告', type: 'daily', resources: [
    { name: 'Pandas 清洗', url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html' },
  ] },
  { day: 44, hall: 2, title: '實現技術指標特徵', desc: 'RSI/MACD/布林帶/ATR/OBV（自己寫，不只用庫）', tools: 'pandas', acceptance: '5 個指標函數通過測試', type: 'daily', resources: [
    { name: '技術指標大全', url: 'https://www.investopedia.com/terms/t/technicalindicator.asp' },
  ] },
  { day: 45, hall: 2, title: '實現基本面特徵', desc: 'PE/PB/ROE/毛利率/負債率（從財務數據計算）', tools: 'pandas', acceptance: '特徵表生成成功', type: 'daily', resources: [
    { name: '基本面分析', url: 'https://www.investopedia.com/terms/f/fundamentalanalysis.asp' },
  ] },
  { day: 46, hall: 2, title: '實現波動率特徵', desc: '歷史波動率/ATR 歸一化/收益偏度峰度', tools: 'pandas/scipy', acceptance: '3 個波動率特徵', type: 'daily', resources: [
    { name: '波動率計算', url: 'https://www.investopedia.com/terms/v/volatility.asp' },
  ] },
  { day: 47, hall: 2, title: '學習特徵標準化', desc: 'Z-score/rank normalization/winsorize，比較三種效果', tools: 'sklearn', acceptance: '比較三種標準化效果', type: 'daily', resources: [
    { name: 'Sklearn Preprocessing', url: 'https://scikit-learn.org/stable/modules/preprocessing.html' },
  ] },
  { day: 48, hall: 2, title: '讀因子中性化入門', desc: '讀關於 industry neutralization 的入門', tools: '論文', acceptance: '理解行業中性化的意義', type: 'daily', resources: [
    { name: '因子中性化', url: 'https://www.aqr.com/Insights/Research/Journal-Article/When-Style-Compounds' },
  ] },
  { day: 49, hall: 2, title: '第七週回顧特徵工程', desc: '特徵工程模組完成，能從原始數據生成 20+ 特徵', tools: 'Git', acceptance: 'features.py 模組', type: 'milestone', resources: [
    { name: '特徵工程指南', url: 'https://www.feature-engine.org/' },
  ] },
  { day: 50, hall: 2, title: '寫EDA筆記本', desc: 'S&P500 收益分佈/相關性矩陣/行業表現，5+ 圖表', tools: 'Jupyter', acceptance: '5+ 張可視化圖表', type: 'daily', resources: [
    { name: 'EDA 指南', url: 'https://www.itl.nist.gov/div898/handbook/eda/eda.htm' },
  ] },
  { day: 51, hall: 2, title: 'IC分析特徵與收益', desc: '分析特徵與未來收益相關性（IC），畫 IC 時間序列', tools: 'Python', acceptance: 'IC 均值、ICIR 計算完成', type: 'daily', resources: [
    { name: 'Information Coefficient', url: 'https://www.investopedia.com/terms/i/information-coefficient.asp' },
  ] },
  { day: 52, hall: 2, title: '看QuantPy因子分析', desc: '看 QuantPy：Factor Analysis in Python', tools: 'YouTube', acceptance: '理解 IC 和 ICIR', type: 'daily', resources: [
    { name: 'QuantPy', url: 'https://www.youtube.com/@QuantPy' },
  ] },
  { day: 53, hall: 2, title: '學習市場微觀結構', desc: '買賣價差/市場深度/滑點來源', tools: '自學', acceptance: '寫 500 字筆記', type: 'daily', resources: [
    { name: '市場微觀結構', url: 'https://www.investopedia.com/terms/m/marketmicrostructure.asp' },
  ] },
  { day: 54, hall: 2, title: 'QC配置真實交易成本', desc: '在 QC 中配置手續費 + 滑點模型', tools: 'QuantConnect', acceptance: '回測包含成本模型', type: 'daily', resources: [
    { name: 'QC 交易成本', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/transaction-fees' },
  ] },
  { day: 55, hall: 2, title: '對比有無交易成本', desc: '對比有/無交易成本的策略績效差異', tools: 'QuantConnect', acceptance: '成本影響分析報告', type: 'daily', resources: [
    { name: '交易成本分析', url: 'https://www.investopedia.com/terms/t/transactioncosts.asp' },
  ] },
  { day: 56, hall: 2, title: '第二月里程碑', desc: '數據基礎設施完成，AWS 管線自動運行，特徵庫就緒', tools: 'Git', acceptance: '數據管線文檔 + 特徵庫', type: 'hall-boss', resources: [
    { name: '數據基礎設施', url: 'https://aws.amazon.com/big-data/' },
  ] },
  { day: 57, hall: 3, title: '讀動量經典論文', desc: '讀 Jegadeesh & Titman (1993) 第 1-3 節', tools: '論文', acceptance: '解釋動量策略邏輯', type: 'daily', resources: [
    { name: 'Jegadeesh 1993', url: 'https://doi.org/10.1111/j.1540-6261.1993.tb04702.x' },
  ] },
  { day: 58, hall: 3, title: '實現跨區域動量策略', desc: '過去 12 月收益最高 10 支股票，月度調倉', tools: 'QuantConnect', acceptance: '策略回測運行', type: 'daily', resources: [
    { name: '動量策略', url: 'https://www.aqr.com/Insights/Research/White-Papers/AS-Momentum-Investing' },
  ] },
  { day: 59, hall: 3, title: '加入跳過最近1月', desc: '避免短期反轉，對比有無跳過的效果', tools: 'QuantConnect', acceptance: '兩版本績效對比', type: 'daily', resources: [
    { name: '短期反轉', url: 'https://www.investopedia.com/terms/r/reversal.asp' },
  ] },
  { day: 60, hall: 3, title: 'Ritvik動量教程', desc: '看 Ritvik YouTube：QuantConnect Momentum Strategy', tools: 'YouTube', acceptance: '理解參數選擇', type: 'daily', resources: [
    { name: 'Ritvik 頻道', url: 'https://www.youtube.com/@FinancialProgrammingwithRitvik' },
  ] },
  { day: 61, hall: 3, title: '實現風險調整動量', desc: '用過去波動率歸一化收益', tools: 'QuantConnect', acceptance: '風險調整版本完成', type: 'daily', resources: [
    { name: '風險調整收益', url: 'https://www.investopedia.com/terms/r/riskadjustedreturn.asp' },
  ] },
  { day: 62, hall: 3, title: '動量參數敏感性分析', desc: '回看期 3/6/9/12 月，持倉 5/10/20 支', tools: 'QuantConnect', acceptance: '參數熱圖', type: 'daily', resources: [
    { name: '參數敏感性', url: 'https://www.investopedia.com/terms/s/sensitivityanalysis.asp' },
  ] },
  { day: 63, hall: 3, title: '第九週回顧動量策略', desc: '動量策略 3 個版本就緒，寫策略文檔', tools: 'Git', acceptance: 'momentum.py + 文檔', type: 'milestone', resources: [
    { name: '策略文檔寫作', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/' },
  ] },
  { day: 64, hall: 3, title: '學習均值回歸理論', desc: 'OU 過程/Hurst 指數', tools: '自學', acceptance: '能用 Python 計算 Hurst', type: 'daily', resources: [
    { name: 'Hurst 指數', url: 'https://en.wikipedia.org/wiki/Hurst_exponent' },
    { name: 'OU 過程', url: 'https://en.wikipedia.org/wiki/Ornstein%E2%80%93Uhlenbeck_process' },
  ] },
  { day: 65, hall: 3, title: '實現配對交易找股票', desc: '找高相關股票（KO 和 PEP），計算價差', tools: 'QuantConnect', acceptance: '協整檢驗通過', type: 'daily', resources: [
    { name: '配對交易', url: 'https://www.investopedia.com/terms/p/pairstrade.asp' },
  ] },
  { day: 66, hall: 3, title: 'ADF檢驗驗證價差平穩', desc: '用 ADF 檢驗驗證價差平穩性，確定配對', tools: 'statsmodels', acceptance: '至少找到 1 對協整股票', type: 'daily', resources: [
    { name: 'ADF 檢驗', url: 'https://www.statsmodels.org/stable/generated/statsmodels.tsa.stattools.adfuller.html' },
  ] },
  { day: 67, hall: 3, title: '實現配對交易邏輯', desc: '價差偏離均值 2σ 開倉，回歸平倉', tools: 'QuantConnect', acceptance: '配對交易策略運行', type: 'daily', resources: [
    { name: 'Z-score 交易', url: 'https://www.investopedia.com/terms/z/zscore.asp' },
  ] },
  { day: 68, hall: 3, title: '看QuantPy配對交易', desc: '看 QuantPy：Pairs Trading in Python', tools: 'YouTube', acceptance: '理解 z-score 交易', type: 'daily', resources: [
    { name: 'QuantPy', url: 'https://www.youtube.com/@QuantPy' },
  ] },
  { day: 69, hall: 3, title: 'RSI均值回歸多股票', desc: '從 Universe 中選 RSI 最低的 5 支', tools: 'QuantConnect', acceptance: '多股票均值回歸完成', type: 'daily', resources: [
    { name: 'RSI 均值回歸', url: 'https://www.investopedia.com/terms/r/rsi.asp' },
  ] },
  { day: 70, hall: 3, title: '第十週回顧均值回歸', desc: '均值回歸策略 2 個版本就緒', tools: 'Git', acceptance: 'pairs_trading.py + rsi_reversion.py', type: 'milestone', resources: [
    { name: '均值回歸策略', url: 'https://www.investopedia.com/terms/m/meanreversion.asp' },
  ] },
  { day: 71, hall: 3, title: '學習海龜交易法則', desc: '學習 Donchian Channel 和海龜交易法則', tools: '自學', acceptance: '理解突破系統邏輯', type: 'daily', resources: [
    { name: '海龜交易法則', url: 'https://www.investopedia.com/terms/t/turtletrading.asp' },
    { name: 'Donchian Channel', url: 'https://www.investopedia.com/terms/d/donchianchannels.asp' },
  ] },
  { day: 72, hall: 3, title: '實現Donchian突破', desc: '20 日新高買入，10 日新低賣出', tools: 'QuantConnect', acceptance: '突破策略運行', type: 'daily', resources: [
    { name: '突破策略', url: 'https://www.investopedia.com/terms/b/breakout.asp' },
  ] },
  { day: 73, hall: 3, title: '加入ATR止損和倉位管理', desc: 'ATR 止損（2×ATR）和 1% 風險倉位', tools: 'QuantConnect', acceptance: '含 ATR 止損版本', type: 'daily', resources: [
    { name: 'ATR', url: 'https://www.investopedia.com/terms/a/atr.asp' },
  ] },
  { day: 74, hall: 3, title: '讀海龜交易法則精華', desc: '讀《海龜交易法則》精華章節', tools: '書籍', acceptance: '理解波動率倉位管理', type: 'daily', resources: [
    { name: '海龜交易法則', url: 'https://www.amazon.com/Way-Turtle-Curtis-Michael-Faith/dp/0071485171' },
  ] },
  { day: 75, hall: 3, title: '移動平均通道突破', desc: 'MACD 信號 + 趨勢過濾的突破策略', tools: 'QuantConnect', acceptance: '第二個突破策略', type: 'daily', resources: [
    { name: 'MACD', url: 'https://www.investopedia.com/terms/m/macd.asp' },
  ] },
  { day: 76, hall: 3, title: '對比三種策略表現', desc: '動量/均值回歸/突破在不同市場環境表現', tools: 'Python', acceptance: '策略對比報告', type: 'daily', resources: [
    { name: '策略比較', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/' },
  ] },
  { day: 77, hall: 3, title: '第十一週回顧3大策略', desc: '3 大策略類型全部實現，5+ 策略', tools: 'Git', acceptance: '策略庫目錄完成', type: 'milestone', resources: [
    { name: '策略庫管理', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/' },
  ] },
  { day: 78, hall: 3, title: 'QC算法框架', desc: 'Alpha → Portfolio → Risk → Execution 四模組', tools: 'QuantConnect', acceptance: '理解四模組架構', type: 'daily', resources: [
    { name: 'QC Algorithm Framework', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/' },
  ] },
  { day: 79, hall: 3, title: '框架重構動量', desc: '分離 Alpha 和 Portfolio', tools: 'QuantConnect', acceptance: '框架版本運行', type: 'daily', resources: [
    { name: 'QC Alpha 模型', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/' },
  ] },
  { day: 80, hall: 3, title: '實現多Alpha組合', desc: '動量 + 均值回歸加權合成信號', tools: 'QuantConnect', acceptance: '雙策略組合運行', type: 'daily', resources: [
    { name: 'QC 組合模型', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/portfolio-construction/' },
  ] },
  { day: 81, hall: 3, title: 'Ritvik框架深度', desc: '看 Ritvik YouTube：QC Algorithm Framework 深度', tools: 'YouTube', acceptance: '理解模組間通信', type: 'daily', resources: [
    { name: 'Ritvik 頻道', url: 'https://www.youtube.com/@FinancialProgrammingwithRitvik' },
  ] },
  { day: 82, hall: 3, title: 'Insights與組合', desc: 'Equal Weighting/Risk Parity', tools: 'QuantConnect', acceptance: '兩種組合方法實現', type: 'daily', resources: [
    { name: 'QC Portfolio Construction', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/portfolio-construction/' },
  ] },
  { day: 83, hall: 3, title: '風險平價組合', desc: '按波動率倒數加權', tools: 'QuantConnect', acceptance: 'Risk Parity 版本完成', type: 'daily', resources: [
    { name: 'Risk Parity', url: 'https://www.investopedia.com/terms/r/risk-parity.asp' },
  ] },
  { day: 84, hall: 3, title: '第三月里程碑', desc: '策略庫完成（5+ 策略），算法框架重構完成', tools: 'Git', acceptance: '策略庫 + 框架版本 + 對比報告', type: 'hall-boss', resources: [
    { name: '策略開發總結', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 85, hall: 4, title: '讀緊縮Sharpe', desc: '讀 Bailey et al. (2014) The Deflated Sharpe Ratio', tools: '論文', acceptance: '理解為何普通 Sharpe 會騙人', type: 'daily', resources: [
    { name: 'Bailey 2014', url: 'https://doi.org/10.1016/j.jbankfin.2014.05.006' },
  ] },
  { day: 86, hall: 4, title: 'WFA滾動驗證', desc: '滾動訓練-測試窗口', tools: '自學', acceptance: '畫 WFA 流程圖', type: 'daily', resources: [
    { name: 'Walk-Forward Analysis', url: 'https://www.investopedia.com/terms/w/walkforwardanalysis.asp' },
  ] },
  { day: 87, hall: 4, title: 'WFA腳本', desc: '對動量策略做 WFA 測試', tools: 'Cursor', acceptance: 'WFA 結果輸出', type: 'daily', resources: [
    { name: 'WFA Python', url: 'https://github.com/marketneutral/walkforward' },
  ] },
  { day: 88, hall: 4, title: '學習過擬合檢測PBO', desc: 'Probability of Backtest Overfitting', tools: '論文/自學', acceptance: '實現 PBO 計算', type: 'daily', resources: [
    { name: 'PBO 論文', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253' },
  ] },
  { day: 89, hall: 4, title: '避免過擬合影片', desc: '看 YouTube：How to Avoid Overfitting in Trading', tools: 'YouTube', acceptance: '理解 IS/OOS', type: 'daily', resources: [
    { name: '過擬合解釋', url: 'https://www.investopedia.com/terms/o/overfitting.asp' },
  ] },
  { day: 90, hall: 4, title: '所有策略樣本外測試', desc: '2020-2024 作為 out-of-sample', tools: 'QuantConnect', acceptance: '每個策略有 IS/OOS 對比', type: 'daily', resources: [
    { name: '樣本外測試', url: 'https://www.investopedia.com/terms/o/outof-sample.asp' },
  ] },
  { day: 91, hall: 4, title: '第十三週回顧回測方法論', desc: '回測方法論筆記 + WFA 工具就緒', tools: 'Git', acceptance: 'walk_forward.py + 過擬合報告', type: 'milestone', resources: [
    { name: '回測最佳實踐', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/' },
  ] },
  { day: 92, hall: 4, title: '蒙特卡洛模擬', desc: '交易記錄隨機重排估計收益分佈', tools: 'Python', acceptance: 'MC 模擬 1000 次結果', type: 'daily', resources: [
    { name: 'Monte Carlo 模擬', url: 'https://www.investopedia.com/terms/m/montecarlosimulation.asp' },
  ] },
  { day: 93, hall: 4, title: 'Expectancy指標', desc: 'Expectancy/Profit Factor/Payoff Ratio', tools: 'Python', acceptance: '3 個指標計算函數', type: 'daily', resources: [
    { name: 'Expectancy', url: 'https://www.investopedia.com/terms/e/expectancy-theory.asp' },
  ] },
  { day: 94, hall: 4, title: '分析回撤指標', desc: '最長回撤持續/恢復曲線/Ulcer Index', tools: 'Python', acceptance: '回撤分析報告', type: 'daily', resources: [
    { name: 'Ulcer Index', url: 'https://www.investopedia.com/terms/u/ulcerindex.asp' },
  ] },
  { day: 95, hall: 4, title: '學習歸因分析', desc: '按行業/市值/因子的收益歸因', tools: '自學', acceptance: '歸因分析框架', type: 'daily', resources: [
    { name: '歸因分析', url: 'https://www.investopedia.com/terms/a/attribution-analysis.asp' },
  ] },
  { day: 96, hall: 4, title: '讀Fama有效市場假說', desc: '讀 Fama (1970) EMH，思考 alpha 來源', tools: '論文', acceptance: '寫 500 字反思', type: 'daily', resources: [
    { name: 'Fama 1970', url: 'https://doi.org/10.1111/j.1540-6261.1970.tb00518.x' },
  ] },
  { day: 97, hall: 4, title: '完整績效分析報告', desc: '對最佳策略做 10+ 指標 + 圖表的報告', tools: 'Python', acceptance: '完整分析報告', type: 'daily', resources: [
    { name: '績效報告', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/' },
  ] },
  { day: 98, hall: 4, title: '第十四週回顧績效工具箱', desc: '績效分析工具箱完成', tools: 'Git', acceptance: 'performance_analyzer.py', type: 'milestone', resources: [
    { name: '績效分析', url: 'https://www.investopedia.com/terms/p/performance-evaluation.asp' },
  ] },
  { day: 99, hall: 4, title: '讀Kelly公式', desc: '讀 Thorp (2006) The Kelly Criterion 精華', tools: '論文', acceptance: '理解 Kelly 公式', type: 'daily', resources: [
    { name: 'Thorp 2006', url: 'https://doi.org/10.1142/9789812772626_0001' },
  ] },
  { day: 100, hall: 4, title: '實現Kelly倉位管理', desc: 'f* = (bp-q)/b', tools: 'Python', acceptance: 'Kelly 計算函數', type: 'daily', resources: [
    { name: 'Kelly Criterion', url: 'https://www.investopedia.com/terms/k/kellycriterion.asp' },
  ] },
  { day: 101, hall: 4, title: '實現固定比例倉位', desc: '每筆風險不超過總資金 1%', tools: 'QuantConnect', acceptance: '1% 風險模型', type: 'daily', resources: [
    { name: '固定比例倉位', url: 'https://www.investopedia.com/terms/p/position-sizing.asp' },
  ] },
  { day: 102, hall: 4, title: '學習最大回撤限制', desc: '組合層面的 drawdown control', tools: '自學', acceptance: '回撤控制邏輯', type: 'daily', resources: [
    { name: '最大回撤', url: 'https://www.investopedia.com/terms/m/maximum-drawdown-mdd.asp' },
  ] },
  { day: 103, hall: 4, title: 'QC風控模型', desc: '單倉位上限 + 行業集中度限制', tools: 'QuantConnect', acceptance: '風控模型運行', type: 'daily', resources: [
    { name: 'QC Risk Management', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/risk-management/' },
  ] },
  { day: 104, hall: 4, title: '倉位管理影片', desc: '看 YouTube：Position Sizing Strategies', tools: 'YouTube', acceptance: '理解 3 種倉位方法', type: 'daily', resources: [
    { name: '倉位管理', url: 'https://www.investopedia.com/terms/p/positionsizing.asp' },
  ] },
  { day: 105, hall: 4, title: '第十五週回顧風控框架', desc: '風控框架就緒，3 種倉位方法可切換', tools: 'Git', acceptance: 'risk_manager.py', type: 'milestone', resources: [
    { name: '風險管理', url: 'https://www.investopedia.com/terms/r/riskmanagement.asp' },
  ] },
  { day: 106, hall: 4, title: '學習訂單類型', desc: 'Market/Limit/Stop/Stop-Limit/Trailing Stop', tools: 'QuantConnect', acceptance: '5 種訂單都用過', type: 'daily', resources: [
    { name: 'QC 訂單類型', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-types' },
  ] },
  { day: 107, hall: 4, title: '實現VWAP執行邏輯', desc: '分批進場減少市場衝擊', tools: 'QuantConnect', acceptance: 'VWAP 執行模型', type: 'daily', resources: [
    { name: 'VWAP', url: 'https://www.investopedia.com/terms/v/vwap.asp' },
  ] },
  { day: 108, hall: 4, title: '學習滑點模型', desc: '固定/百分比/Volatility 滑點', tools: 'QuantConnect', acceptance: '3 種滑點模型對比', type: 'daily', resources: [
    { name: '滑點', url: 'https://www.investopedia.com/terms/s/slippage.asp' },
  ] },
  { day: 109, hall: 4, title: '對比即時vsVWAP執行', desc: '即時執行 vs VWAP 的績效差異', tools: 'QuantConnect', acceptance: '執行成本分析', type: 'daily', resources: [
    { name: '執行算法', url: 'https://www.investopedia.com/terms/a/algorithmic-trading.asp' },
  ] },
  { day: 110, hall: 4, title: '實現策略冷卻期', desc: '連續虧損 3 筆後暫停交易 5 天', tools: 'QuantConnect', acceptance: '冷卻機制運行', type: 'daily', resources: [
    { name: '交易心理', url: 'https://www.investopedia.com/terms/t/trading-psychology.asp' },
  ] },
  { day: 111, hall: 4, title: '整合風控+執行最終回測', desc: '風控 + 執行到最佳策略，做最終回測', tools: 'QuantConnect', acceptance: '完整版策略回測', type: 'daily', resources: [
    { name: '策略整合', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/' },
  ] },
  { day: 112, hall: 4, title: '第四月里程碑', desc: '回測 + 風控 + 執行全鏈路打通，策略通過嚴格驗證', tools: 'Git', acceptance: '完整版策略 + 驗證報告', type: 'hall-boss', resources: [
    { name: '回測驗證', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 113, hall: 5, title: '讀三因子論文', desc: '讀 Fama & French (1993) 三因子模型全文', tools: '論文', acceptance: '解釋 SMB、HML 因子構建', type: 'daily', resources: [
    { name: 'Fama French 1993', url: 'https://doi.org/10.1016/0304-405X(93)90023-5' },
  ] },
  { day: 114, hall: 5, title: '手動構建SMB因子', desc: '小市值減大市值因子', tools: 'Python', acceptance: 'SMB 因子時間序列', type: 'daily', resources: [
    { name: 'SMB 因子', url: 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html' },
  ] },
  { day: 115, hall: 5, title: '手動構建HML因子', desc: '高 BM 減低 BM 因子', tools: 'Python', acceptance: 'HML 因子時間序列', type: 'daily', resources: [
    { name: 'HML 因子', url: 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html' },
  ] },
  { day: 116, hall: 5, title: 'QuantPy三因子', desc: '看 QuantPy：Fama-French 3 Factor Model', tools: 'YouTube', acceptance: '理解因子回歸', type: 'daily', resources: [
    { name: 'QuantPy', url: 'https://www.youtube.com/@QuantPy' },
  ] },
  { day: 117, hall: 5, title: '線性回歸做因子歸因', desc: '分析策略收益來自哪些因子', tools: 'statsmodels', acceptance: '因子暴露分析報告', type: 'daily', resources: [
    { name: '因子歸因', url: 'https://www.investopedia.com/terms/f/factor-analysis.asp' },
  ] },
  { day: 118, hall: 5, title: '學習Barra風險模型', desc: '行業因子 + 風格因子概念', tools: '自學', acceptance: '寫 Barra 模型筆記', type: 'daily', resources: [
    { name: 'Barra 模型', url: 'https://www.msci.com/barra' },
  ] },
  { day: 119, hall: 5, title: '第十七週回顧三因子', desc: '三因子模型手動實現完成', tools: 'Git', acceptance: 'fama_french.py', type: 'milestone', resources: [
    { name: '因子模型', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/' },
  ] },
  { day: 120, hall: 5, title: '讀四因子論文', desc: '加入 MOM 動量因子', tools: '論文', acceptance: '四因子模型理解', type: 'daily', resources: [
    { name: 'Carhart 1997', url: 'https://doi.org/10.1111/j.1540-6261.1997.tb03808.x' },
  ] },
  { day: 121, hall: 5, title: '手動構建MOM因子', desc: '12-1 月動量因子', tools: 'Python', acceptance: 'MOM 因子序列', type: 'daily', resources: [
    { name: '動量因子', url: 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html' },
  ] },
  { day: 122, hall: 5, title: '讀QMJ質量因子', desc: '讀 Asness et al. (2013) QMJ', tools: '論文', acceptance: '理解質量因子構建', type: 'daily', resources: [
    { name: 'Asness 2013', url: 'https://doi.org/10.2139/ssrn.2312432' },
  ] },
  { day: 123, hall: 5, title: '構建質量因子', desc: 'ROE/毛利率/應計利潤/財務槓桿綜合得分', tools: 'Python', acceptance: 'QMJ 因子序列', type: 'daily', resources: [
    { name: '質量因子', url: 'https://www.aqr.com/Insights/Research/Journal-Article/Quality-Minus-Junk' },
  ] },
  { day: 124, hall: 5, title: '5因子IC和ICIR分析', desc: '對 5 個因子做 IC 和 ICIR 分析', tools: 'Python', acceptance: '因子有效性報告', type: 'daily', resources: [
    { name: 'ICIR', url: 'https://www.investopedia.com/terms/i/information-coefficient.asp' },
  ] },
  { day: 125, hall: 5, title: 'Alpha品質因子', desc: '看 Alpha Architect YouTube：Quality Factor', tools: 'YouTube', acceptance: '理解質量因子實戰', type: 'daily', resources: [
    { name: 'Alpha Architect', url: 'https://www.youtube.com/@AlphaArchitect' },
  ] },
  { day: 126, hall: 5, title: '第十八週回顧因子庫', desc: '因子庫擴展到 5 個因子，有效性分析完成', tools: 'Git', acceptance: '因子庫 v2', type: 'milestone', resources: [
    { name: '因子投資', url: 'https://www.aqr.com/Insights/Research' },
  ] },
  { day: 127, hall: 5, title: '學習因子合成方法', desc: '等權/IC 加權/ICIR 加權', tools: '自學', acceptance: '3 種合成方法筆記', type: 'daily', resources: [
    { name: '因子合成', url: 'https://www.investopedia.com/terms/m/multifactor-model.asp' },
  ] },
  { day: 128, hall: 5, title: 'ICIR加權選股', desc: '每月選綜合得分最高 20 支股票', tools: 'QuantConnect', acceptance: '多因子策略運行', type: 'daily', resources: [
    { name: '多因子模型', url: 'https://www.investopedia.com/terms/m/multifactor-model.asp' },
  ] },
  { day: 129, hall: 5, title: '加入因子中性化', desc: '行業中性 + 市值中性', tools: 'Python', acceptance: '中性化前後對比', type: 'daily', resources: [
    { name: '因子中性化', url: 'https://www.aqr.com/Insights/Research' },
  ] },
  { day: 130, hall: 5, title: '學習因子正交化', desc: '殘差法去除因子間相關性', tools: 'statsmodels', acceptance: '正交化因子庫', type: 'daily', resources: [
    { name: '正交化', url: 'https://en.wikipedia.org/wiki/Orthogonalization' },
  ] },
  { day: 131, hall: 5, title: '對比三種因子處理', desc: '原始 vs 中性化 vs 正交化選股效果', tools: 'QuantConnect', acceptance: '三版本對比報告', type: 'daily', resources: [
    { name: '因子處理', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/' },
  ] },
  { day: 132, hall: 5, title: '讀五因子論文', desc: '加入 RMW 和 CMA 因子', tools: '論文', acceptance: '五因子模型理解', type: 'daily', resources: [
    { name: 'Fama French 2015', url: 'https://doi.org/10.1016/j.jfineco.2014.10.010' },
  ] },
  { day: 133, hall: 5, title: '第十九週回顧多因子系統', desc: '多因子選股系統 v1 完成', tools: 'Git', acceptance: 'multifactor.py', type: 'milestone', resources: [
    { name: '多因子選股', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 134, hall: 5, title: '學習微軟Qlib框架', desc: '安裝/數據格式/第一個實驗', tools: 'Qlib', acceptance: 'Qlib 跑通 baseline', type: 'daily', resources: [
    { name: '微軟 Qlib', url: 'https://github.com/microsoft/qlib' },
  ] },
  { day: 135, hall: 5, title: '讀ML資產定價', desc: '讀 Gu et al. (2020) 精華', tools: '論文', acceptance: '理解 ML 在資產定價應用', type: 'daily', resources: [
    { name: 'Gu 2020', url: 'https://doi.org/10.1093/rfs/hhz047' },
  ] },
  { day: 136, hall: 5, title: 'XGBoost因子合成', desc: '20+ 特徵預測下月收益', tools: 'xgboost', acceptance: 'XGBoost 模型訓練完成', type: 'daily', resources: [
    { name: 'XGBoost', url: 'https://xgboost.readthedocs.io/' },
  ] },
  { day: 137, hall: 5, title: 'LightGBM對比', desc: '用 LightGBM 做同樣任務對比', tools: 'lightgbm', acceptance: '兩模型對比', type: 'daily', resources: [
    { name: 'LightGBM', url: 'https://lightgbm.readthedocs.io/' },
  ] },
  { day: 138, hall: 5, title: 'SHAP特徵重要性分析', desc: 'SHAP 值解釋 ML 模型決策', tools: 'shap', acceptance: 'SHAP 分析圖表', type: 'daily', resources: [
    { name: 'SHAP', url: 'https://shap.readthedocs.io/' },
  ] },
  { day: 139, hall: 5, title: '防止過擬合', desc: 'TimeSeriesSplit + early stopping + 特徵篩選', tools: 'sklearn', acceptance: '過擬合檢查通過', type: 'daily', resources: [
    { name: 'TimeSeriesSplit', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html' },
  ] },
  { day: 140, hall: 5, title: '第五月里程碑', desc: '多因子 + ML 選股系統完成，10+ 因子', tools: 'Git', acceptance: 'ML 因子模型 + 多因子系統', type: 'hall-boss', resources: [
    { name: 'ML 量化', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 141, hall: 6, title: '設計量化系統架構圖', desc: '數據 → 特徵 → 模型 → 策略 → 風控 → 執行', tools: '繪圖', acceptance: '架構圖完成', type: 'daily', resources: [
    { name: '交易系統架構', url: 'https://www.quantconnect.com/docs/v2/lean-engine/key-concepts' },
  ] },
  { day: 142, hall: 6, title: '學習AWS量化架構', desc: 'EC2 + S3 + Lambda + RDS', tools: 'AWS', acceptance: '架構對應 AWS 服務', type: 'daily', resources: [
    { name: 'AWS 量化架構', url: 'https://aws.amazon.com/blogs/industries/how-to-build-and-backtest-systematic-trading-strategies-on-aws-with-aws-batch-and-airflow/' },
  ] },
  { day: 143, hall: 6, title: '創建項目結構v2', desc: '按模組分層（data/features/models/strategies/risk/execution）', tools: 'Cursor', acceptance: '新目錄結構就緒', type: 'daily', resources: [
    { name: '項目結構', url: 'https://docs.python-guide.org/writing/structure/' },
  ] },
  { day: 144, hall: 6, title: '模組接口設計', desc: '抽象基類保證可替換性', tools: 'Python ABC', acceptance: 'ABC 接口定義完成', type: 'daily', resources: [
    { name: 'Python ABC', url: 'https://docs.python.org/3/library/abc.html' },
  ] },
  { day: 145, hall: 6, title: '系統架構影片', desc: '看 YouTube：Building a Trading System Architecture', tools: 'YouTube', acceptance: '理解模組化設計', type: 'daily', resources: [
    { name: '系統架構', url: 'https://www.youtube.com/results?search_query=trading+system+architecture' },
  ] },
  { day: 146, hall: 6, title: '實現配置管理YAML', desc: 'YAML 管理策略參數/數據源/風控參數', tools: 'PyYAML', acceptance: '配置文件驅動策略', type: 'daily', resources: [
    { name: 'PyYAML', url: 'https://pyyaml.org/' },
  ] },
  { day: 147, hall: 6, title: '第二十一週回顧系統架構', desc: '系統架構就緒，模組化重構開始', tools: 'Git', acceptance: '架構文檔 + 新目錄', type: 'milestone', resources: [
    { name: '系統設計', url: 'https://www.quantconnect.com/docs/v2/lean-engine/' },
  ] },
  { day: 148, hall: 6, title: '創建RDS數據庫', desc: '存儲交易記錄和策略狀態', tools: 'AWS RDS', acceptance: '數據庫可連接', type: 'daily', resources: [
    { name: 'AWS RDS', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html' },
  ] },
  { day: 149, hall: 6, title: '寫database.py', desc: '交易記錄的 CRUD 操作', tools: 'psycopg2', acceptance: '數據庫操作通過測試', type: 'daily', resources: [
    { name: 'psycopg2', url: 'https://www.psycopg.org/docs/' },
  ] },
  { day: 150, hall: 6, title: '創建EC2實例', desc: 't3.micro 免費層，部署 Python 環境', tools: 'AWS EC2', acceptance: 'SSH 連接成功', type: 'daily', resources: [
    { name: 'AWS EC2 入門', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html' },
  ] },
  { day: 151, hall: 6, title: 'Docker容器化', desc: 'Dockerfile + docker-compose', tools: 'Docker', acceptance: '本地 docker compose up 成功', type: 'daily', resources: [
    { name: 'Docker 入門', url: 'https://docs.docker.com/get-started/' },
  ] },
  { day: 152, hall: 6, title: '部署Docker到EC2', desc: '將鏡像部署到 EC2，配置安全組', tools: 'AWS EC2', acceptance: '容器在 EC2 運行', type: 'daily', resources: [
    { name: 'Docker 部署 EC2', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html' },
  ] },
  { day: 153, hall: 6, title: 'CloudWatch監控', desc: 'CPU/內存/應用日誌告警', tools: 'AWS CloudWatch', acceptance: '告警規則配置完成', type: 'daily', resources: [
    { name: 'CloudWatch', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html' },
  ] },
  { day: 154, hall: 6, title: '第二十二週回顧AWS部署', desc: '系統在 AWS 上運行，數據庫 + 計算 + 監控就緒', tools: 'AWS', acceptance: '雲端系統可訪問', type: 'milestone', resources: [
    { name: 'AWS 部署', url: 'https://aws.amazon.com/getting-started/' },
  ] },
  { day: 155, hall: 6, title: 'QC實盤交易', desc: '紙面交易模式', tools: 'QuantConnect', acceptance: '紙面交易帳號就緒', type: 'daily', resources: [
    { name: 'QC Live Trading', url: 'https://www.quantconnect.com/docs/v2/cloud-platform/live-trading/' },
  ] },
  { day: 156, hall: 6, title: '部署最佳策略到紙面交易', desc: '將最佳策略部署到 QC 紙面交易', tools: 'QuantConnect', acceptance: '策略開始實時運行', type: 'daily', resources: [
    { name: 'QC 部署', url: 'https://www.quantconnect.com/docs/v2/cloud-platform/live-trading/' },
  ] },
  { day: 157, hall: 6, title: '設置每日日誌', desc: '記錄持倉/PnL/信號/訂單', tools: 'Python', acceptance: '日誌文件每日生成', type: 'daily', resources: [
    { name: 'Python logging', url: 'https://docs.python.org/3/library/logging.html' },
  ] },
  { day: 158, hall: 6, title: '實現異常監控通知', desc: '策略報錯/數據缺失/訂單失敗時發通知', tools: 'AWS SNS', acceptance: '告警通知可收到', type: 'daily', resources: [
    { name: 'AWS SNS', url: 'https://docs.aws.amazon.com/sns/latest/dg/welcome.html' },
  ] },
  { day: 159, hall: 6, title: '讀實盤與回測差異', desc: 'slippage/liquidity/regime change', tools: '文章', acceptance: '寫 500 字風險提示', type: 'daily', resources: [
    { name: '實盤差異', url: 'https://www.investopedia.com/terms/p/papertrade.asp' },
  ] },
  { day: 160, hall: 6, title: '觀察紙面交易3天', desc: '記錄與回測的差異', tools: '觀察', acceptance: '差異分析筆記', type: 'daily', resources: [
    { name: '紙面交易', url: 'https://www.investopedia.com/terms/p/papertrade.asp' },
  ] },
  { day: 161, hall: 6, title: '第二十三週回顧紙面交易', desc: '紙面交易系統運行中，監控和日誌就緒', tools: 'QC + AWS', acceptance: '實時運行的策略', type: 'milestone', resources: [
    { name: '實盤監控', url: 'https://www.quantconnect.com/docs/v2/cloud-platform/live-trading/' },
  ] },
  { day: 162, hall: 6, title: '整合所有模組', desc: '數據管線 → 特徵 → 因子 → 策略 → 風控 → 執行 → 監控', tools: '整合', acceptance: '一鍵啟動全系統', type: 'daily', resources: [
    { name: '系統整合', url: 'https://www.quantconnect.com/docs/v2/lean-engine/' },
  ] },
  { day: 163, hall: 6, title: '寫完整系統文檔', desc: '架構圖/模組說明/部署指南/故障排查', tools: 'Markdown', acceptance: 'README 文檔完成', type: 'daily', resources: [
    { name: '技術文檔', url: 'https://www.markdownguide.org/' },
  ] },
  { day: 164, hall: 6, title: '做壓力測試', desc: '模擬 2008 金融危機/2020 新冠崩盤', tools: 'QuantConnect', acceptance: '壓力測試報告', type: 'daily', resources: [
    { name: '壓力測試', url: 'https://www.investopedia.com/terms/s/stress-testing.asp' },
  ] },
  { day: 165, hall: 6, title: 'Streamlit儀表板', desc: '可交互的策略績效儀表板', tools: 'Streamlit', acceptance: 'Dashboard 可運行', type: 'daily', resources: [
    { name: 'Streamlit', url: 'https://streamlit.io/' },
  ] },
  { day: 166, hall: 6, title: '學習實盤監控和優化', desc: '策略實盤監控和持續優化', tools: 'YouTube', acceptance: '優化計劃文檔', type: 'daily', resources: [
    { name: '策略優化', url: 'https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/' },
  ] },
  { day: 167, hall: 6, title: '制定後6個月計劃', desc: '實盤小資金/更多因子/高頻/期權', tools: '規劃', acceptance: '路線圖 v2', type: 'daily', resources: [
    { name: '量化進階', url: 'https://www.quantconnect.com/learning' },
  ] },
  { day: 168, hall: 6, title: '量化封神日', desc: '系統上線/文檔完成/Git Tag v1.0/慶祝', tools: 'Git', acceptance: 'v1.0 release', type: 'final-boss', resources: [
    { name: 'Git Tag', url: 'https://git-scm.com/book/en/v2/Git-Basics-Tagging' },
  ] },
];

// Detailed daily tasks (derived from STEPS)
const DAILY_TASKS = {};
STEPS.forEach(s => {
  DAILY_TASKS[s.day] = {
    core: s.desc,
    resource: s.tools,
    review: null,
    resources: s.resources.map(r => r.name),
    tools: s.tools,
    acceptance: s.acceptance,
  };
});

// === Resource URL Mapping (derived from STEPS resources) ===
const RESOURCE_URLS = {
  'Cursor IDE 官網': 'https://cursor.sh',
  'Python 3.11 安裝指南': 'https://www.python.org/downloads/',
  'QuantConnect 官網': 'https://www.quantconnect.com',
  'QC Local Platform 文檔': 'https://www.quantconnect.com/docs/v2/local-platform/',
  'AWS 官網': 'https://aws.amazon.com',
  'AWS CLI 安裝': 'https://docs.aws.amazon.com/cli/',
  'IAM 入門': 'https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html',
  'Git 官網': 'https://git-scm.com',
  'GitHub 入門': 'https://guides.github.com/activities/hello-world/',
  'yfinance PyPI': 'https://pypi.org/project/yfinance/',
  'Matplotlib 文檔': 'https://matplotlib.org/stable/contents.html',
  'Pandas 官方教程': 'https://pandas.pydata.org/docs/getting_started/index.html',
  'Pandas Cheat Sheet': 'https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf',
  'QC Learning Center': 'https://www.quantconnect.com/learning',
  'QC Bootcamp': 'https://www.quantconnect.com/learning',
  'QC 指標文檔': 'https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/',
  'QC 算法框架': 'https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/',
  'QC 回測文檔': 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/',
  'QC 移動平均': 'https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/supported-indicators/moving-average',
  'QC 歷史數據': 'https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/',
  'Git 文檔': 'https://git-scm.com/doc',
  'Markowitz 1952': 'https://doi.org/10.1111/j.1540-6261.1952.tb01525.x',
  'QuantPy 頻道': 'https://www.youtube.com/@QuantPy',
  '金融數據入門': 'https://www.investopedia.com/terms/o/ohlcchart.asp',
  'Sharpe Ratio 解釋': 'https://www.investopedia.com/terms/s/sharperatio.asp',
  'Sharpe 1964': 'https://doi.org/10.1111/j.1540-6261.1964.tb02825.x',
  'Python 單元測試': 'https://docs.python.org/3/library/unittest.html',
  '績效分析指南': 'https://www.investopedia.com/articles/investing/101315/how-analyze-your-trading-performance.asp',
  'RSI 指標解釋': 'https://www.investopedia.com/terms/r/rsi.asp',
  'QC 回測': 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/',
  'QC 訂單類型': 'https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-types',
  '止損策略': 'https://www.investopedia.com/articles/stocks/09/use-stop-loss.asp',
  'Financial Programming with Ritvik': 'https://www.youtube.com/@FinancialProgrammingwithRitvik',
  'QC 參數優化': 'https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/',
  '月度回顧方法': 'https://www.forbes.com/sites/forbescoachescouncil/2020/12/17/how-to-conduct-an-effective-monthly-review/',
  'Alpha Vantage': 'https://www.alphavantage.co/',
  'Polygon.io': 'https://polygon.io/',
  'yfinance': 'https://pypi.org/project/yfinance/',
  'yfinance 文檔': 'https://pypi.org/project/yfinance/',
  'S&P 500 列表': 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies',
  'QC Universe Selection': 'https://www.quantconnect.com/docs/v2/writing-algorithms/universes/',
  'QC 基本面數據': 'https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/quantconnect/us-equity-fundamental-data',
  'Data Snooping 解釋': 'https://www.investopedia.com/terms/d/datasnooping.asp',
  'Look-Ahead Bias': 'https://www.investopedia.com/terms/l/lookaheadbias.asp',
  '數據管理最佳實踐': 'https://www.dataquest.io/blog/data-cleaning/',
  'AWS S3 入門': 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html',
  'Boto3 S3 文檔': 'https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html',
  'Boto3 下載': 'https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-example-download-file.html',
  'AWS IAM 策略': 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html',
  'AWS 官方 YouTube': 'https://www.youtube.com/@amazonwebservices',
  'AWS Lambda': 'https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html',
  'EventBridge': 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-get-started.html',
  '數據管線設計': 'https://aws.amazon.com/big-data/datalakes-and-analytics/',
  'Pandas 清洗': 'https://pandas.pydata.org/docs/user_guide/missing_data.html',
  '技術指標大全': 'https://www.investopedia.com/terms/t/technicalindicator.asp',
  '基本面分析': 'https://www.investopedia.com/terms/f/fundamentalanalysis.asp',
  '波動率計算': 'https://www.investopedia.com/terms/v/volatility.asp',
  'Sklearn Preprocessing': 'https://scikit-learn.org/stable/modules/preprocessing.html',
  '因子中性化': 'https://www.aqr.com/Insights/Research',
  '特徵工程指南': 'https://www.feature-engine.org/',
  'EDA 指南': 'https://www.itl.nist.gov/div898/handbook/eda/eda.htm',
  'Information Coefficient': 'https://www.investopedia.com/terms/i/information-coefficient.asp',
  'QuantPy': 'https://www.youtube.com/@QuantPy',
  '市場微觀結構': 'https://www.investopedia.com/terms/m/marketmicrostructure.asp',
  'QC 交易成本': 'https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/transaction-fees',
  '交易成本分析': 'https://www.investopedia.com/terms/t/transactioncosts.asp',
  '數據基礎設施': 'https://aws.amazon.com/big-data/',
  'Jegadeesh 1993': 'https://doi.org/10.1111/j.1540-6261.1993.tb04702.x',
  '動量策略': 'https://www.aqr.com/Insights/Research/White-Papers/AS-Momentum-Investing',
  '短期反轉': 'https://www.investopedia.com/terms/r/reversal.asp',
  'Ritvik 頻道': 'https://www.youtube.com/@FinancialProgrammingwithRitvik',
  '風險調整收益': 'https://www.investopedia.com/terms/r/riskadjustedreturn.asp',
  '參數敏感性': 'https://www.investopedia.com/terms/s/sensitivityanalysis.asp',
  '策略文檔寫作': 'https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/',
  'Hurst 指數': 'https://en.wikipedia.org/wiki/Hurst_exponent',
  'OU 過程': 'https://en.wikipedia.org/wiki/Ornstein%E2%80%93Uhlenbeck_process',
  '配對交易': 'https://www.investopedia.com/terms/p/pairstrade.asp',
  'ADF 檢驗': 'https://www.statsmodels.org/stable/generated/statsmodels.tsa.stattools.adfuller.html',
  'Z-score 交易': 'https://www.investopedia.com/terms/z/zscore.asp',
  'RSI 均值回歸': 'https://www.investopedia.com/terms/r/rsi.asp',
  '均值回歸策略': 'https://www.investopedia.com/terms/m/meanreversion.asp',
  '海龜交易法則': 'https://www.amazon.com/Way-Turtle-Curtis-Michael-Faith/dp/0071485171',
  'Donchian Channel': 'https://www.investopedia.com/terms/d/donchianchannels.asp',
  '突破策略': 'https://www.investopedia.com/terms/b/breakout.asp',
  'ATR': 'https://www.investopedia.com/terms/a/atr.asp',
  'MACD': 'https://www.investopedia.com/terms/m/macd.asp',
  '策略比較': 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/',
  '策略庫管理': 'https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/',
  'QC Algorithm Framework': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/',
  'QC Alpha 模型': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/',
  'QC 組合模型': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/portfolio-construction/',
  'QC Portfolio Construction': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/portfolio-construction/',
  'Risk Parity': 'https://www.investopedia.com/terms/r/risk-parity.asp',
  '策略開發總結': 'https://www.quantconnect.com/learning',
  'Bailey 2014': 'https://doi.org/10.1016/j.jbankfin.2014.05.006',
  'Walk-Forward Analysis': 'https://www.investopedia.com/terms/w/walkforwardanalysis.asp',
  'WFA Python': 'https://github.com/marketneutral/walkforward',
  'PBO 論文': 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253',
  '過擬合解釋': 'https://www.investopedia.com/terms/o/overfitting.asp',
  '樣本外測試': 'https://www.investopedia.com/terms/o/outof-sample.asp',
  '回測最佳實踐': 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/',
  'Monte Carlo 模擬': 'https://www.investopedia.com/terms/m/montecarlosimulation.asp',
  'Expectancy': 'https://www.investopedia.com/terms/e/expectancy-theory.asp',
  'Ulcer Index': 'https://www.investopedia.com/terms/u/ulcerindex.asp',
  '歸因分析': 'https://www.investopedia.com/terms/a/attribution-analysis.asp',
  'Fama 1970': 'https://doi.org/10.1111/j.1540-6261.1970.tb00518.x',
  '績效報告': 'https://www.quantconnect.com/docs/v2/writing-algorithms/backtesting/',
  '績效分析': 'https://www.investopedia.com/terms/p/performance-evaluation.asp',
  'Thorp 2006': 'https://doi.org/10.1142/9789812772626_0001',
  'Kelly Criterion': 'https://www.investopedia.com/terms/k/kellycriterion.asp',
  '固定比例倉位': 'https://www.investopedia.com/terms/p/position-sizing.asp',
  '最大回撤': 'https://www.investopedia.com/terms/m/maximum-drawdown-mdd.asp',
  'QC Risk Management': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/risk-management/',
  '倉位管理': 'https://www.investopedia.com/terms/p/positionsizing.asp',
  '風險管理': 'https://www.investopedia.com/terms/r/riskmanagement.asp',
  'VWAP': 'https://www.investopedia.com/terms/v/vwap.asp',
  '滑點': 'https://www.investopedia.com/terms/s/slippage.asp',
  '執行算法': 'https://www.investopedia.com/terms/a/algorithmic-trading.asp',
  '交易心理': 'https://www.investopedia.com/terms/t/trading-psychology.asp',
  '策略整合': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/',
  '回測驗證': 'https://www.quantconnect.com/learning',
  'Fama French 1993': 'https://doi.org/10.1016/0304-405X(93)90023-5',
  'SMB 因子': 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html',
  'HML 因子': 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html',
  '因子歸因': 'https://www.investopedia.com/terms/f/factor-analysis.asp',
  'Barra 模型': 'https://www.msci.com/barra',
  '因子模型': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/',
  'Carhart 1997': 'https://doi.org/10.1111/j.1540-6261.1997.tb03808.x',
  '動量因子': 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html',
  'Asness 2013': 'https://doi.org/10.2139/ssrn.2312432',
  '質量因子': 'https://www.aqr.com/Insights/Research/Journal-Article/Quality-Minus-Junk',
  'ICIR': 'https://www.investopedia.com/terms/i/information-coefficient.asp',
  'Alpha Architect': 'https://www.youtube.com/@AlphaArchitect',
  '因子投資': 'https://www.aqr.com/Insights/Research',
  '因子合成': 'https://www.investopedia.com/terms/m/multifactor-model.asp',
  '多因子模型': 'https://www.investopedia.com/terms/m/multifactor-model.asp',
  '正交化': 'https://en.wikipedia.org/wiki/Orthogonalization',
  '因子處理': 'https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/',
  'Fama French 2015': 'https://doi.org/10.1016/j.jfineco.2014.10.010',
  '多因子選股': 'https://www.quantconnect.com/learning',
  '微軟 Qlib': 'https://github.com/microsoft/qlib',
  'Gu 2020': 'https://doi.org/10.1093/rfs/hhz047',
  'XGBoost': 'https://xgboost.readthedocs.io/',
  'LightGBM': 'https://lightgbm.readthedocs.io/',
  'SHAP': 'https://shap.readthedocs.io/',
  'TimeSeriesSplit': 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html',
  'ML 量化': 'https://www.quantconnect.com/learning',
  '交易系統架構': 'https://www.quantconnect.com/docs/v2/lean-engine/key-concepts',
  'AWS 量化架構': 'https://aws.amazon.com/blogs/industries/how-to-build-and-backtest-systematic-trading-strategies-on-aws-with-aws-batch-and-airflow/',
  '項目結構': 'https://docs.python-guide.org/writing/structure/',
  'Python ABC': 'https://docs.python.org/3/library/abc.html',
  '系統架構': 'https://www.youtube.com/results?search_query=trading+system+architecture',
  'PyYAML': 'https://pyyaml.org/',
  '系統設計': 'https://www.quantconnect.com/docs/v2/lean-engine/',
  'AWS RDS': 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html',
  'psycopg2': 'https://www.psycopg.org/docs/',
  'AWS EC2 入門': 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html',
  'Docker 入門': 'https://docs.docker.com/get-started/',
  'Docker 部署 EC2': 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html',
  'CloudWatch': 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html',
  'AWS 部署': 'https://aws.amazon.com/getting-started/',
  'QC Live Trading': 'https://www.quantconnect.com/docs/v2/cloud-platform/live-trading/',
  'QC 部署': 'https://www.quantconnect.com/docs/v2/cloud-platform/live-trading/',
  'Python logging': 'https://docs.python.org/3/library/logging.html',
  'AWS SNS': 'https://docs.aws.amazon.com/sns/latest/dg/welcome.html',
  '實盤差異': 'https://www.investopedia.com/terms/p/papertrade.asp',
  '紙面交易': 'https://www.investopedia.com/terms/p/papertrade.asp',
  '實盤監控': 'https://www.quantconnect.com/docs/v2/cloud-platform/live-trading/',
  '系統整合': 'https://www.quantconnect.com/docs/v2/lean-engine/',
  '技術文檔': 'https://www.markdownguide.org/',
  '壓力測試': 'https://www.investopedia.com/terms/s/stress-testing.asp',
  'Streamlit': 'https://streamlit.io/',
  '策略優化': 'https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/',
  '量化進階': 'https://www.quantconnect.com/learning',
  'Git Tag': 'https://git-scm.com/book/en/v2/Git-Basics-Tagging',
};

function getResUrl(name) {
  if (!name) return null;
  const trimmed = name.trim();
  if (RESOURCE_URLS[trimmed]) return RESOURCE_URLS[trimmed];
  // fuzzy: try stripping prefix patterns
  for (const key in RESOURCE_URLS) {
    if (trimmed.includes(key) || key.includes(trimmed)) return RESOURCE_URLS[key];
  }
  // Fallback: Google search
  return 'https://www.google.com/search?q=' + encodeURIComponent(trimmed);
}

// Title / Rank system (scaled for 168-day journey)
const TITLES = [
  { min: 0, max: 6, name: 'Pilgrim', cn: '朝聖者', icon: '🚶' },
  { min: 7, max: 17, name: 'Apprentice', cn: '見習術士', icon: '📜' },
  { min: 18, max: 33, name: 'Quant Walker', cn: '量化行者', icon: '⚡' },
  { min: 34, max: 55, name: 'Strategy Adept', cn: '策略修士', icon: '🗡️' },
  { min: 56, max: 83, name: 'Data Guardian', cn: '數據守護者', icon: '🛡️' },
  { min: 84, max: 111, name: 'Backtest Sage', cn: '回測賢者', icon: '🔮' },
  { min: 112, max: 139, name: 'Factor Mage', cn: '因子法師', icon: '✨' },
  { min: 140, max: 167, name: 'System Architect', cn: '系統架構師', icon: '🏛️' },
  { min: 168, max: 9999, name: 'Quant Deity', cn: '量化之神', icon: '👑' },
];

// Sacred fire levels (scaled for 168-day streak)
const FIRE_LEVELS = [
  { min: 0, name: '靜寂', glowSize: 0 },
  { min: 1, name: '初焰', glowSize: 1 },
  { min: 7, name: '恆焰', glowSize: 2 },
  { min: 21, name: '烈焰', glowSize: 3 },
  { min: 50, name: '金焰', glowSize: 4 },
  { min: 100, name: '聖焰', glowSize: 5 },
];

// Helper: get title by completed count
function getTitle(completedCount) {
  for (let i = TITLES.length - 1; i >= 0; i--) {
    if (completedCount >= TITLES[i].min) return TITLES[i];
  }
  return TITLES[0];
}

// Helper: get fire level by streak
function getFireLevel(streak) {
  for (let i = FIRE_LEVELS.length - 1; i >= 0; i--) {
    if (streak >= FIRE_LEVELS[i].min) return FIRE_LEVELS[i];
  }
  return FIRE_LEVELS[0];
}

// Get hall by day
function getHallByDay(day) {
  for (const hall of HALLS) {
    if (day >= hall.startDay && day <= hall.endDay) return hall;
  }
  return HALLS[HALLS.length - 1];
}

// Get daily tasks for a day (generates if not in DAILY_TASKS)
function getDailyTasks(day, completedSteps) {
  if (DAILY_TASKS[day]) return DAILY_TASKS[day];

  // Generate from step data
  const step = STEPS.find(s => s.day === day);
  const hall = getHallByDay(day);

  // Find recent completed step for review
  const completedDays = completedSteps
    .filter(d => d > 0 && d < day)
    .sort((a, b) => b - a);
  const reviewDay = completedDays[Math.floor(Math.random() * Math.min(7, completedDays.length))] || null;
  const reviewStep = reviewDay ? STEPS.find(s => s.day === reviewDay) : null;

  return {
    core: step ? step.desc : `Day ${day} 學習任務`,
    resource: step ? (step.tool || null) : null,
    review: reviewStep ? `回顧：Day ${reviewDay} - ${reviewStep.title}` : null,
    resources: step ? [step.tool, step.verify] : ['自學內容'],
  };
}

window.QUANTUM_TEMPLE_DATA = {
  HALLS,
  STEPS,
  DAILY_TASKS,
  TITLES,
  FIRE_LEVELS,
  getTitle,
  getFireLevel,
  getHallByDay,
  getDailyTasks,
  getResUrl,
  TOTAL_STEPS: STEPS.length,
};
