import { BUY_LOOT, CLAIM_LOOT } from "../actions/drop_action";
import { DropNFTs } from "../../utils/common";

const initState = {
  nftList: [...DropNFTs],
  boughtNfts: [
    {
      slug: "yjwlx2bimp4x6k90",
      name: "Test Art 1",
      uin: "4653060f024ead041891",
      artist_name: "Test 1",
      artist_age: 12,
      image_url:
        "https://beyondlife-stgac.s3.ap-south-1.amazonaws.com/bv7hecg3t27r0dsbwxr7ma3jw4sj?response-content-disposition=inline%3B%20filename%3D%22lspioi%22%3B%20filename%2A%3DUTF-8%27%27lspioi&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQBZHJSGBXI6T6BUZ%2F20220828%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220828T174852Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA8ew78%2FZvrQlGHQwLAX%2BRKUpZpRpQVUHNLgKs4CcGbWoCIQClUGd9v8n%2FUXAe5B2Kt9QTrSeXGar8%2B%2Ffpy7o7%2BJVhTyrVBAgaEAEaDDAwMzg0MDUxMjM4NyIMgFAP7TfLfmcZe%2B%2BnKrIEnBZ9tQTzyCqhhnjyibX3T1LYUB1zUDgwWVpajni8WS6I4fxleH5PNYRLT%2BEm7FCajPLDG6hLGnnN%2FisOW%2Baqqmt1GQqSrbf0vBPOJQRyLBso84iZSdAuOlyHVW2jP6y7RcC7oOCg89MqzQNaXKS1ZaqDH%2FrhMEyI0U3quG2%2BJi0oAGO02iTDzBChw5NwntMS7vTMUw12rf5NMHXmfIu2SbiNhOZoz%2Bho6IngW%2BcStlYzPUGkdu4U3CWODZfdgjORMeGN7VH4Mql%2FoLkK5umd3LYfY26MZJxobwDUANuMcX0P5toNv%2BprC81CCyrN3QJ%2FA%2BtbBFqWdONM98kKzJ33ZnlxWePZRseprBquWBq%2BnmJ1kFvk%2BW9GyUbG5pW9R3f2fXvJ8JpY75v4YUx1wNaBvpmok0eHG2YXU3BBWZ0%2Bg1X8%2FPPIoOWRkF%2F7TzPCpKUWfNFCM0GWBR3q0u63cVMkN7mbJ0szFwIr9GWx9sHl63XuZ6jlPzM%2F8Gczsc0dShvLd9BwBw4e9Wl568nVul3Ed9bTb98OZlTP5xzHLHpA3CioR0bE9IeRWIosyg6%2FoNlPAEEu4wvkpA1Bs8LlsA%2BiF%2F3RugatZ05yPwrQfekZX4m5fKVB8j4a2MO%2FuvK6buzIGGfnMZVwCDLIab8vOVC0RritajvBz3Q%2FUsLKCkMAZDU8Em3VxFPD5Hy8lbWSz0%2Bo%2BuJqU97kXzbJ2NFJvTLbQuM41Sbud2phKkyp%2FVkWPnE5CTDGtq6YBjqpAYgqiz1Advo99UDQtD9BM36IVgh64tyhqDGcmRCuHwIft60kuGlQ7XAUS%2FeuVYTW49tzKKnQYzD%2Buldmx8Iip%2BbBbgZ6Zo7nQhjLX1eiiTZzpzGAJ4m8cQ0Ogt1oBgNDtB1FeF25jf%2BdJo%2Fu9a4rezvBb%2BOMLEkr07PbmDurlLTQ%2ByZ0neO%2Fm9AdAMuGefsHXUnfx9UIB9zTCA8LTaEz3EgJmOf%2BtqIn%2F1U%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=a29b5b287fd5b87aac7437d18aafb89ef6a9f45e2ed83d970b8a705a83ff8bd0",
      created_at: "2022-08-24T09:58:30.261Z",
      updated_at: "2022-08-24T09:58:30.313Z",
      amount: 1000,
      isClaimed: false,
      isBought: true,
    },
  ],
};

const drop_reducer = (state = initState, { payload = null, type }) => {
  if (type === BUY_LOOT) {
    let boughtNfts = [...state.boughtNfts];
    let nftList = [...state.nftList];
    let { quantity } = payload;

    for (let i = 0; i < nftList.length; i++) {
      if (!nftList[i].isBought) {
        boughtNfts.push(nftList[i]);
        nftList[i].isBought = true;
        if (quantity === boughtNfts.length - state.boughtNfts.length) break;
      }
    }
    return { ...state, nftList, boughtNfts };
  }
  if (type === CLAIM_LOOT) {
    let boughtNfts = [...state.boughtNfts];
    boughtNfts.splice(payload.index, 1, { ...payload, isClaimed: true });
    return { ...state, boughtNfts };
  }
  return state;
};

export default drop_reducer;
