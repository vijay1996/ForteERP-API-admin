import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, unique: false, required: true},
    lastName: {type: String, unique: false, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: false, required: true},
    isAdmin: {type: String, unique: false, required: true},
    uniqueOrgId: {type: String, unique: false, required: true}
});
const User = mongoose.model('users', userSchema);


const ProductSchema = new mongoose.Schema({
    productName: {type: String, unique: true, required: true},
    image: {type: String, unique: false, required: false},
    description: {type: String, unique: true, required: true},
    currency: {type: String, unique: false, required: true},
    price: {type: Number, unique: false, required: true},
    category: {type: String, unique: false, required: false},
    publish: {type: String, unique: false, required: false, default: 'N'},
    attributeCode: {type: String, unique: false, required: false},
    attributes: {type: Object, unique: false, required: false},
    uniqueOrgId: {type: String, unique: false, required: true}
});
const Product = mongoose.model('products', ProductSchema);


const OrganisationSchema = new mongoose.Schema({
    name: {type: String, unique: false, required: true},
    email: {type: String, unique: false, required: true},
    password: {type: String, unique: false, required: true},
    addressLine1: {type: String, unique: false, required: false},
    addressLine2: {type: String, unique: false, required: false},
    city: {type: String, unique: false, required: false},
    state: {type: String, unique: false, required: false},
    country: {type: String, unique: false, required: false},
    areaCode: {type: String, unique: false, required: false},
    attributes: {type: Object, unique: false ,required: false},
    active: {type: Boolean, unique: false, required: false}
});
const Organisation = mongoose.model('organisations', OrganisationSchema);


const AttributeSchema = new mongoose.Schema({
    attributeCode: {type: String, unique: true, required: true},
    shortDescription: {type: String, unique: false, required: true},
    descriptioin: {type: String, unique: false, required: false},
    attributes: {type: Object, unique: false ,required: false},
    uniqueOrgId: {type: String, unique: false, required: true}
});
const Attribute = mongoose.model('attributes', AttributeSchema);


export default {
    "organisation": Organisation,
    "users": User,
    "products": Product,
    "attributes": Attribute
}