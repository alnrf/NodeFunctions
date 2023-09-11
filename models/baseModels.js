import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  filamentColor: {
    type: String,
    required: true,
  },

  printingTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityStock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: false,
  },
  orderable: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },
  address: {
    streetName: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    complement: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
});

export const Products = mongoose.model("Products", productSchema);
