import { Layout } from "../../constant"

const FontWeight = {
  Light: "NotoSansKR_300Light",
  Regular: "NotoSansKR_400Regular",
  Medium: "NotoSansKR_500Medium",
  Bold: "NotoSansKR_700Bold",
}

const FontSizeNormalDevice = {
  Header: 20,
  H1: 28,
  H2: 26,
  H3: 22,
  Primary: 18,
  Secondary: 16,
  Tertiary: 14,
}

const FontSizeSmallDevice = {
  Header: 18,
  H1: 22,
  H2: 20,
  H3: 18,
  Primary: 16,
  Secondary: 14,
  Tertiary: 12,
}

const FontSize = Layout.isSmallDevice
  ? FontSizeSmallDevice
  : FontSizeNormalDevice

const Font = { FontWeight, FontSize }

export { Font }
