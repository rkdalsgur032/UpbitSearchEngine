import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// Manual
export const candleState = atom({
  key: "candle",
  default: "1day",
});

export const marketState = atom({
  key: "market",
  default: ["KRW", "BTC", "USDT"],
});

export const algorithmState = atom({
  key: "algorithm",
  default: "OverFall",
});

export const progressCounterState = atom({
  key: "progressCounter",
  default: 0,
});

export const currentChartState = atom({
  key: "currentChart",
  default: "",
});

const DEFAULT_MOVING_AVERAGE = 20;
export const overFallMaDaysState = atom({
  key: "overFallMaDays",
  default: DEFAULT_MOVING_AVERAGE,
});

export interface MarketRawProps {
  market: string;
  korean_name: string;
  english_name: string;
}

export const marketCodesRawState = atom({
  key: "marketCodesRaw",
  default: [] as MarketRawProps[],
});

export interface MarketCodesProps {
  marketCode: string;
  market: string;
}

export const filteredMarketCodesState = selector({
  key: "filteredMarketCodes",
  get: ({ get }) => {
    const rawData = get(marketCodesRawState);
    const result = rawData.map((marketCode) => {
      return {
        marketCode: marketCode.market,
        market: marketCode.market.split("-")[0],
      };
    });
    return result;
  },
});

export const targetMarketCodesState = selector({
  key: "targetMarketCodes",
  get: ({ get }) => {
    const marketCodes = get(filteredMarketCodesState);
    const market = get(marketState);
    const result = marketCodes.filter((marketCode) =>
      market.includes(marketCode.market)
    );
    return result;
  },
});

export interface searchMarketCodesProps {
  marketCode: string;
  market: string;
  search: boolean;
  match: boolean;
  envelope: {
    low: boolean;
    high: boolean;
  };
  ichimoku: {
    upSpan: boolean;
  };
}

export const searchMarketCodesState = atom({
  key: "searchMarketCodes",
  default: [] as searchMarketCodesProps[],
});

// Auto
export const AutoSearchActiveState = atom({
  key: "AutoSearchActive",
  default: false,
});

export const autoNavState = atom({
  key: "autoNav",
  default: "dashboard",
});

export const MOVING_AVERAGE_KOREAN_NAME = "이동평균선";
export const OVERFALL_KOREAN_NAME = "낙폭과대";
export const ICHIMOKU_KOREAN_NAME = "일목균형표";

export const autoSettingCurAlgoState = atom({
  key: "autoSettingCurAlgo",
  default: MOVING_AVERAGE_KOREAN_NAME,
});

const AUTO_ALGO_LIST: string[] = [
  MOVING_AVERAGE_KOREAN_NAME,
  OVERFALL_KOREAN_NAME,
  ICHIMOKU_KOREAN_NAME,
];

const { persistAtom: autoAlgoListLocal } = recoilPersist({
  key: "autoAlgoListLocal",
  storage: localStorage,
});

export interface autoAlgoListStateProps {
  algo: string;
  active: boolean;
}

export const autoAlgoListState = atom({
  key: "autoAlgoList",
  default: AUTO_ALGO_LIST.map((ele) => {
    return { algo: ele, active: false };
  }) as autoAlgoListStateProps[],
  effects_UNSTABLE: [autoAlgoListLocal],
});

export const autoMarketCodesListState = atom({
  key: "autoMarketCodesList",
  default: [] as MarketRawProps[],
});

export interface AlgoDataProps {
  id: string;
  detecting: boolean;
  alarm: boolean;
  candle: {
    id: string;
    alarmSector: number;
    detail: {
      id: string;
      on: boolean;
      data: any;
    }[];
  }[];
}

export const algoDataState = atom({
  key: "algoDataState",
  default: {} as AlgoDataProps,
});

export interface AutoMarketCodesDataSetProps {
  marketCode: string;
  algorithms: AlgoDataProps[];
}

export const getDefaultAutoMarketCodesDataSet = () => {
  const newOne = {
    marketCode: "",
    algorithms: [
      {
        id: "이동평균선",
        detecting: false,
        alarm: false,
        candle: [
          {
            id: "1day",
            alarmSector: 0.1,
            detail: [
              { id: "ma1", on: false, data: { maNumber: 0 } },
              { id: "ma2", on: false, data: { maNumber: 0 } },
            ],
          },
          {
            id: "1hour",
            alarmSector: 0.1,
            detail: [
              { id: "ma1", on: false, data: { maNumber: 0 } },
              { id: "ma2", on: false, data: { maNumber: 0 } },
            ],
          },
          {
            id: "15min",
            alarmSector: 0.1,
            detail: [
              { id: "ma1", on: false, data: { maNumber: 0 } },
              { id: "ma2", on: false, data: { maNumber: 0 } },
            ],
          },
          {
            id: "5min",
            alarmSector: 0.1,
            detail: [
              { id: "ma1", on: false, data: { maNumber: 0 } },
              { id: "ma2", on: false, data: { maNumber: 0 } },
            ],
          },
        ],
      },
    ],
  } as AutoMarketCodesDataSetProps;
  return newOne;
};

const { persistAtom: autoMarketCodesDataSetLocal } = recoilPersist({
  key: "autoMarketCodesDataSetLocal",
  storage: localStorage,
});

export const autoMarketCodesDataSetState = atom({
  key: "autoMarketCodesDataSet",
  default: [] as AutoMarketCodesDataSetProps[],
  effects_UNSTABLE: [autoMarketCodesDataSetLocal],
});
