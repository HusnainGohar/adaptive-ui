import { PERSONAS } from "./personas"
import ReviewReaderLayout from "../layouts/ReviewReaderLayout"
import DealHunterLayout from "../layouts/DealHunterLayout"
import WindowShopperLayout from "../layouts/WindowShopperLayout"
import ImpulseShopperLayout from "../layouts/ImpulseShopperLayout"
import LoyalCustomerLayout from "../layouts/LoyalCustomerLayout"
import PracticalShopperLayout from "../layouts/PracticalShopperLayout"
import EthicalShopperLayout from "../layouts/EthicalShopperLayout"
import GiftGiverLayout from "../layouts/GiftGiverLayout"

export const layoutMap = {
  [PERSONAS.REVIEW_READER]: ReviewReaderLayout,
  [PERSONAS.DEAL_HUNTER]: DealHunterLayout,
  [PERSONAS.WINDOW_SHOPPER]: WindowShopperLayout,
  [PERSONAS.IMPULSE_SHOPPER]: ImpulseShopperLayout,
  [PERSONAS.LOYAL_CUSTOMER]: LoyalCustomerLayout,
  [PERSONAS.PRACTICAL_SHOPPER]: PracticalShopperLayout,
  [PERSONAS.ETHICAL_SHOPPER]: EthicalShopperLayout,
  [PERSONAS.GIFT_GIVER]: GiftGiverLayout,
}
