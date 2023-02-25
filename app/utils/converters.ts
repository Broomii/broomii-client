export const transformDeliveryStatus = (
  status: "deliverable" | "inDelivery" | "deliveryComplete",
): "pending" | "inProgress" | "done" => {
  switch (status) {
    case "deliverable":
      return "pending"
    case "inDelivery":
      return "inProgress"
    case "deliveryComplete":
      return "done"
    default:
      return "pending"
  }
}