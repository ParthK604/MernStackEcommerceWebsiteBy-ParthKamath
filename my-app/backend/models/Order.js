import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  price: Number,
  quantity: Number,
});

const orderSchema=new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Users",
      required:true,
    },
    items:[orderItemSchema],
    address:{
      type:String,
      required:true,
    },
    totalAmount:{
      type:Number,
      required:true,
    },
    status: {
      type: String,
      default: "PLACED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order",orderSchema);
