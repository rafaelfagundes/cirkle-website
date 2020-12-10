enum CouponType {
  VALUE = "VALUE",
  PERCENTAGE = "PERCENTAGE",
}

type Coupon = {
  id: string;
  type: CouponType;
  value: number;
};

export default Coupon;
