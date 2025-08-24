import { OrderModel } from "./Model.js";

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      shippingAddress,
      city,
      postalCode,
      orderItems,
      totalAmount
    } = req.body;

    const newOrder = await OrderModel.create({
      customerName,
      customerEmail,
      shippingAddress,
      city,
      postalCode,
      orderItems,
      totalAmount,
      paymentMethod: "JazzCash"
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await OrderModel.countDocuments();
    const pendingOrders = await OrderModel.countDocuments({ orderStatus: 'pending' });
    const confirmedOrders = await OrderModel.countDocuments({ orderStatus: 'confirmed' });
    const deliveredOrders = await OrderModel.countDocuments({ orderStatus: 'delivered' });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await OrderModel.countDocuments({
      createdAt: { $gte: today }
    });

    const totalRevenue = await OrderModel.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        todayOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      id,
      { 
        orderStatus, 
        paymentStatus,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
