export interface IParcelItem {
  _id: string;
  trackingId: string;
  type: string;
  weight: number;
  fee: number;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryDate: string;
  currentStatus: string;
  isBlocked?: boolean;
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  receiver: {
    _id: string;
    name: string;
    email: string;
  };
}