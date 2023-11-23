import _ from "lodash";
import {
  Context,
  ParentProps,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

const SELECTED_SHOP_ID_STORAGE_KEY = "selected_shop_id";

type SelectedShopContextType = ReturnType<typeof initialize>;

const SelectedShopContext: Context<SelectedShopContextType> = createContext(
  initialize()
);

export function SelectedShopContextProvider(props: ParentProps) {
  return (
    <SelectedShopContext.Provider value={useContext(SelectedShopContext)}>
      {props.children}
    </SelectedShopContext.Provider>
  );
}

export function useSelectedShopContext() {
  if (_.isNil(SelectedShopContext)) {
    throw new Error("Must be wrapped in <SelectedShopContext>");
  }

  return useContext(SelectedShopContext);
}

function initialize() {
  let shopId = localStorage?.getItem(SELECTED_SHOP_ID_STORAGE_KEY);
  const [selectedShopId, setSelectedShopId_] = createSignal(shopId);

  function setSelectedShopId(shopId?: string | null) {
    if (!_.isNil(shopId)) {
      localStorage?.setItem(SELECTED_SHOP_ID_STORAGE_KEY, shopId);
      setSelectedShopId_(shopId);
    } else {
      localStorage?.removeItem(SELECTED_SHOP_ID_STORAGE_KEY);
      setSelectedShopId_(null);
    }
  }

  return { selectedShopId, setSelectedShopId };
}
