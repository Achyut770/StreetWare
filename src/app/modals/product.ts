import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    discount: number;
    price: number;
    imageUrl: string[];
    createdAt?: Date;
    updatedAt?: Date;
    __id?: string
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    imageUrl: [{ type: String, required: true }],
}, {
    timestamps: true,
});

const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
